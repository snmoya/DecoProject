const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON data
app.use(express.json());

// A simple route
app.get('/api', (req, res) => {
    res.send('Hello from the backend!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
