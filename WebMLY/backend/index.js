const express = require('express');
const path = require('path'); // Importing the path module
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');   // For hashing passwords
const jwt = require('jsonwebtoken');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 8081;

// * Use CORS to allow requests from other origins
app.use(cors({
    origin: '*',    // Allow all origins
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-api-key'
}));

// Trust proxy (since Nginx is handling the requests)
app.set('trust proxy', 'loopback');

// Middleware to parse JSON data
app.use(express.json());

// Serve the React app from the 'build' folder
app.use(express.static(path.join(__dirname, '../frontend/build')));

// * Middleware to check API key
function checkApiKey(req, res, next) {
    const clientApiKey = req.headers['x-api-key'];
    const serverApiKey = process.env.API_KEY;

    if (clientApiKey && clientApiKey === serverApiKey) {
        next();
    } else {
        res.status(403).send('Forbidden - Invalid API Key');
    }
}

// * Connect to the database
let connectionPool;
(async () => {
    try {
        const dbConfig = {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,    // Maximum number of connections in the pool
            queueLimit: 0           // No limit for queued connection requests 
        };

        // Add port for MySQL if is running on local
        if (process.env.MYSQL_PORT)
            dbConfig.port = process.env.MYSQL_PORT;
            
        // Create a connection using promises
        connectionPool = mysql.createPool(dbConfig);

        console.log('Connected to MySQL!');
    } catch (err) {
        console.error('Error connecting to MySQL:', err);
    }
})();

// * Function to extract coordinates
function extractCoordinates(polygon) {
    // Check if polygon is a string (JSON) or an object
    const geoJSON = typeof polygon === 'string' ? JSON.parse(polygon) : polygon;

    // Ensure the object has the expected structure
    if (geoJSON && geoJSON.coordinates && Array.isArray(geoJSON.coordinates[0])) {
        return geoJSON.coordinates[0].map(coord => [coord[1], coord[0]]);
    } else {
        throw new Error('Invalid GeoJSON structure');
    }
}

// * API route
app.get('/api', checkApiKey, async (req, res) => {
    try {
        const [rows] = await connectionPool.execute('SELECT * FROM test');
        res.json({ message: rows[0].message });
    } catch (err) {
        res.json({ message: 'Error fetching data' });
    }
});

// * Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if the user exists in the database
        const [accountResult] = await connectionPool.execute(
            'SELECT * FROM accounts WHERE username = ?',
            [username]
        );

        if (accountResult.length == 0) {
            return res.status(400).json({ error: 'Invalid username or password ' });
        }

        // Get the user
        const user = accountResult[0];

        // Compare the password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Get the organisation id associated with this account
        const [organisationResult] = await connectionPool.execute(
            'SELECT * FROM organisations WHERE id = ?',
            [user.org_id]
        );

        if (organisationResult.length == 0) {
            return res.status(400).json({ error: 'No organisation associated with this account' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { accId: user.id, orgId: user.org_id },  // Payload
            process.env.JWT_SECRET,  // Secret or private key
            { expiresIn: '1d' }  // Token expiry (1 day in this case)
        );

        res.status(200).json({ 
            token,
            message: 'Login successful' 
        });
    } catch (error) {
        console.error('ERROR: Logging in', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// * Add new account from user registration
app.post('/api/signup', async (req, res) => {
    const { username, password, confirmPassword, organisationName } = req.body;

    // Validation
    if (!username || !password || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword)
        return res.status(400).json({ error: 'Passwords do not match' });

    try {
        // Check if username already exists
        const [existingUser] = await connectionPool.execute(
            'SELECT id FROM accounts WHERE username = ?',
            [username]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Username is already taken' });
        }

        // Insert new organisation into the database
        const [orgResult] = await connectionPool.execute(
            'INSERT INTO organisations (name) VALUES (?)',
            [organisationName]
        );

        // Retrieve the inserted organisation's ID
        const organisationId = orgResult.insertId;

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);     // 10 is the salt rounds

        // Insert new user into the database
        const [accResult] = await connectionPool.execute(
            'INSERT INTO accounts (username, password, org_id) VALUES (?, ?, ?)',
            [username, hashedPassword, organisationId]
        );

        // Send success response
        res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
        console.error('ERROR: Creating account', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// * Create new zones
app.post('/api/zones', async (req, res) => {
    const { org_id, name, address, polygon } = req.body;

    // Basic validation
    if (!org_id || !name || !address || !polygon || !Array.isArray(polygon)) {
        return res.status(400).json({ error: 'Invalid request. Name, address, and polygon are required' });
    }

    try {
        // Convert the polygon into a string format for storage in the database
        const polygonString = `POLYGON((${polygon.map(coord => `${coord[1]} ${coord[0]}`).join(', ')}))`;

        // Insert the new zone into the database
        const [result] = await connectionPool.execute(
            'INSERT INTO zones (org_id, name, address, polygon) VALUES (?, ?, ?, ST_GeomFromText(?))',
            [org_id, name, address, polygonString]
        );

        // Respond with the ID of the created zone
        res.status(201).json({ message: 'Zone created successfully', zoneId: result.insertId});
    } catch (error) {
        console.error('ERROR: Creating zone:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// * Get all zones (or from specific organisation)
app.get('/api/zones', async (req, res) => {
    const { orgId } = req.query;    // Get org id from query params

    try {
        // Base query
        let query = 'SELECT id, name, address, ST_AsGeoJSON(polygon) AS polygon FROM zones';
        let queryParams = [];

        // If orgId provided, concatenate the query
        if (orgId) {
            query += ' WHERE org_id = ?';
            queryParams.push(orgId);
        }

        // Execute the query
        const [rows] = await connectionPool.execute(query, queryParams);

        // Zone not found
        if (rows.length === 0) {
            console.log('No zone found');
            return res.status(200).json([]);
        }

        // Transform each zone to extract polygon coordinates
        const transformedZones = rows.map((zone) => ({
            ...zone,
            polygon: extractCoordinates(zone.polygon),
        }));

        // Return the result as JSON
        res.json(transformedZones);
    } catch (error) {
        console.log('ERROR:', error);
        res.status(500).json({ error: 'Server error' });
    }
})

// * Get specific zone
app.get('/api/zones/:id', async (req, res) => {
    try {
        const zoneId = req.params.id;   // Get zone id from param

        // Query the zone with given id
        const [rows] = await connectionPool.execute(
            'SELECT id, name, address, ST_AsGeoJSON(polygon) AS polygon FROM zones WHERE id = ?',
            [zoneId]
        );

        // Zone not found
        if (rows.length === 0) {
            console.log('Zone not found');
            return res.status(404).json({ error: 'Zone not found' });
        }

        // Extract the polygon coordinates
        const transformedZone = {
            ...rows[0],
            polygon: extractCoordinates(rows[0].polygon)
        };

        // Return the result as JSON
        res.json(transformedZone);
    } catch (error) {
        console.log('ERROR:', error);
        res.status(500).json({ error: 'Server error' });
    }
})

// * Delete specific zone by ID
app.delete('/api/zones/:id', async (req, res) => {
    const zoneId = req.params.id;

    try {
        // Check if the zone exists
        const [zone] = await connectionPool.execute('SELECT * FROM zones WHERE id = ?', [zoneId]);
        if (zone.length === 0) {
            return res.status(404).json({ error: 'Zone not found' });
        }

        // Delete the zone
        await connectionPool.execute('DELETE FROM zones WHERE id = ?', [zoneId]);

        res.status(200).json({ message: 'Zone deleted successfully' });
    } catch (error) {
        console.error('Error deleting zone:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// * Create new notification
app.post('/api/notifications', async (req, res) => {
    const { title, message, zones } = req.body;

    // Validation: Ensure message & zone_id are provided
    if (!message || !zones || zones.length === 0) {
        return res.status(400).json({ error: 'Message and at least one zone_id are required'});
    }

    try {
        // Loop over the selected zones
        for (const zone_id of zones) {
            // Check if the zone exists in the database
            const [zoneResult] = await connectionPool.execute(
                'SELECT id FROM zones WHERE id = ?',
                [zone_id]
            );

            if (zoneResult.length == 0) {
                return res.status(400).json({ error: 'Invalid zone id'});
            }

            // Insert the new notification into the notifications table
            await connectionPool.execute(
                'INSERT INTO notifications (title, message, zone_id, created_at) VALUES (?, ?, ?, ?)',
                [title, message, zone_id, new Date()]
            );
        }
        
        // Send success response with the newly created notification's id
        res.status(201).json({ message: 'Notification created successfully' });
    } catch (error) {
        console.error('ERROR: Creating notification', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// * Get all the notifications (or from specific zones)
app.get('/api/notifications', async (req, res) => {
    const { zoneId } = req.query;   // Get zone id from query params

    try {
        // Base query
        let query = 'SELECT * FROM notifications';
        let queryParams = [];

        // If zoneId provided, concatenate the query
        if (zoneId) {
            query += ' WHERE zone_id = ?';
            queryParams.push(zoneId);
        }

        // Execute the query
        const [rows] = await connectionPool.execute(query, queryParams);

        // Notification not found
        if (rows.length === 0) {
            console.log('No notification found');
            return res.status(200).json([]);
        }

        // Return the notifications
        res.status(200).json(rows);
    } catch (error) {
        console.log('ERROR: Fetching notifications', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// * Fallback route to serve the React app for any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
