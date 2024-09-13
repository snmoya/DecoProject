const express = require('express');
const path = require('path'); // Importing the path module
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8081;

// Use CORS to allow requests from other origins
app.use(cors({
    origin: '*',    // Allow all origins
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));

// Trust proxy (since Nginx is handling the requests)
app.set('trust proxy', 'loopback');

// Middleware to parse JSON data
app.use(express.json());

// Serve the React app from the 'build' folder
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API route
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// Fallback route to serve the React app for any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
