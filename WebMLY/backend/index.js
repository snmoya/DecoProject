const express = require('express');
const path = require('path'); // Importing the path module
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise')

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 8081;

// Use CORS to allow requests from other origins
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

// Middleware to check API key
function checkApiKey(req, res, next) {
    const clientApiKey = req.headers['x-api-key'];
    const serverApiKey = process.env.API_KEY;

    if (clientApiKey && clientApiKey === serverApiKey) {
        next();
    } else {
        res.status(403).send('Forbidden - Invalid API Key');
    }
}

// Connect to the database
let connectionPool;
(async () => {
    try {
        // Create a connection using promises
        connectionPool = await mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,    // Maximum number of connections in the pool
            queueLimit: 0           // No limit for queued connection requests
        });

        console.log('Connected to MySQL!');
    } catch (err) {
        console.error('Error connecting to MySQL:', err);
    }
})();

// API route
app.get('/api', checkApiKey, async (req, res) => {
    try {
        const [rows] = await connectionPool.execute('SELECT * FROM test');
        res.json({ message: rows[0].message });
    } catch (err) {
        res.json({ message: 'Error fetching data'});
    }
});

// Fallback route to serve the React app for any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
