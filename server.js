const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// 1. Health Check Endpoint (Used by Fly.io, Oracle, or AWS to monitor container status)
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString()
    });
});

// 2. Explicitly protect server files from being downloaded
app.get(['/server.js', '/package.json', '/package-lock.json', '/Dockerfile', '/.dockerignore', '/fly.toml'], (req, res) => {
    res.status(404).send('Not Found');
});

// 3. Serve static files directly from the root directory
app.use(express.static(__dirname));

// 4. Catch-all: Direct all other URL paths to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Node app running directly from root on port ${PORT}`);
});
