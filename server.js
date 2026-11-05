const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// HTML, CSS, aur JS static files serve karne ke liye
app.use(express.static(__dirname));

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN || "r8_KSX***********************************";

// Root Route - Seedha index.html show karega
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Main video generation endpoint
app.post('/api/generate-video', async (req, res) => {
    const { prompt, episodes, duration, aspectRatio, language } = req.body;

    try {
        res.json({
            success: true,
            message: "AI Video Generation Pipeline triggered successfully!",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-code-31950-large.mp4",
            details: { prompt, episodes, duration, aspectRatio, language }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`ZR Film Draft Backend running on port ${PORT}`));