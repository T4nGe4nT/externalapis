const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// CORS middleware to handle cross-origin requests
app.use(cors());

// Serve the HTML file at the root endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to fetch memes from Imgflip API
app.get('/memes', async (req, res) => {
    try {
        const response = await axios.get('https://api.imgflip.com/get_memes');

        // Check if the request to Imgflip API was successful
        if (response.status !== 200) {
            throw new Error('Failed to fetch memes');
        }

        const memes = response.data.data.memes;
        
        // Send the memes data as JSON response
        res.json({ memes });
    } catch (error) {
        console.error('Error fetching memes:', error);
        res.status(500).send('Error fetching memes');
    }
});

// Start the server and listen on specified PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
