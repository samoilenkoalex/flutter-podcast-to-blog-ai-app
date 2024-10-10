import express from 'express';
import multer from 'multer';
import speechToTextService from '../services/speechToTextService.js';

import summarizeService from '../services/summarizationService.js';

import textToAudioService from '../services/textToAudioService.js';
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/convertSpeech', upload.single('audio'), async (req, res) => {
    try {
        const filePath = req.file ? req.file.path : req.body.filePath;
        console.log('Received file path:', filePath);

        const text = await speechToTextService.convertSpeechToText(filePath);
        console.log('Speech to text result:', text);

        const summary = await summarizeService.summarizeResult(text);
        console.log('Summary result:', summary);

        const audioBuffer = await textToAudioService.convertSummaryToAudio(
            summary
        );

        // Send the audio data as a buffer
        res.set('Content-Type', 'audio/mpeg');
        res.send(audioBuffer);
    } catch (error) {
        console.error('Error in /convertSpeech:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: error.message, stack: error.stack });
    }
});

export default router;
