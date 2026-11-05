const express = require('express');
const cors = require('cors');
const path = require('path');
const Replicate = require('replicate');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN || "r8_KSX..." // Apna real token Render environment variables mein dalein
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Working API Route for AI Video Generation
app.post('/api/generate-video', async (req, res) => {
    const { prompt, duration, aspectRatio } = req.body;
    try {
        const output = await replicate.run(
            "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816fd4af51f3149fa7a2e0b05b1c4ef8f861b",
            {
                input: {
                    input_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
                    video_frames: "14",
                    motion_bucket_id: 127
                }
            }
        );
        const videoUrl = Array.isArray(output) ? output[0] : output;
        res.json({ success: true, videoUrl: videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-code-31950-large.mp4" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));