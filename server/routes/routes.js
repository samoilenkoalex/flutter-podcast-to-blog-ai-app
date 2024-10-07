import express from 'express';
import speechToTextService from '../services/speechToTextService.js';

const router = express.Router();

// POST request to convert speech to text
router.post('/convertSpeech', async (req, res) => {
    try {
        const filePath = req.body.filePath; // Assuming filePath is passed in the request body
        const result = await speechToTextService.convertSpeechToText(filePath);
        console.log('convertSpeechToText result:', result); // Log the result
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
