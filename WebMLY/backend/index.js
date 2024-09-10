const express = require('express');
const path = require('path'); // Importing the path module
const app = express();
const PORT = process.env.PORT || 8081;

// Middleware to parse JSON data
app.use(express.json());

// Serve the React app from the 'build' folder
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API route
app.get('/api', (req, res) => {
    res.send('Hello from the backend!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
