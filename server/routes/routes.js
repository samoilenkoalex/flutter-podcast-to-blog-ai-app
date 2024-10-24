import express from 'express';
import multer from 'multer';
import speechToTextService from '../services/speechToTextService.js';
import summarizeService from '../services/summarizationService.js';
import textToAudioService from '../services/textToAudioService.js';
import podcastIndexService from '../services/podcastIndexService.js';
import translationService from '../services/translationService.js';

import imageService from '../services/imageService.js';
import chatService from '../services/chatService.js';
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/convertSpeech', upload.single('audio'), async (req, res) => {
    try {
        const podcast = await podcastIndexService.performPodcastIndexSearch();
        console.log('Podcast:', podcast);
    } catch (error) {
        console.error('Error in /convertSpeech:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: error.message, stack: error.stack });
    }
});
router.post('/episodes', async (req, res) => {
    try {
        // Access query parameters from req.query
        const { searchTerm, limit, offset } = req.body;

        // Pass query parameters to the performPodcastIndexSearch method
        const podcast = await podcastIndexService.performPodcastIndexSearch({
            searchTerm,
            limit,
            offset,
        });

        console.log('Podcast:', searchTerm);
        res.json(podcast);
    } catch (error) {
        console.error('Error in /episodes:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: error.message, stack: error.stack });
    }
});

router.post('/episode_summary', async (req, res) => {
    try {
        const { searchTerm, limit, offset } = req.body;

        console.log('episode_summary>>:', searchTerm);
        const podcast =
            await podcastIndexService.performPodcastIndexEpisodesSearch(
                searchTerm
            );
        console.log('Podcast:', podcast.episode.enclosureUrl);
        const fileUrl = podcast.episode.enclosureUrl;
        const localFilePath = await speechToTextService.downloadAudioToLocal(
            fileUrl
        );
        console.log('File downloaded to:', localFilePath);
        const text = await speechToTextService.convertSpeechToText(
            localFilePath
        );
        console.log('Speech to text result:', text);
        const summary = await summarizeService.summarizeResult(text);

        res.json(summary);
    } catch (error) {
        console.error('Error in /episode_summary:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: error.message, stack: error.stack });
    }
});

router.post('/episode_speech_to_text', async (req, res) => {
    try {
        const { searchTerm, limit, offset } = req.body;

        console.log('episodeSummarize>>:', searchTerm);
        const podcast =
            await podcastIndexService.performPodcastIndexEpisodesSearch(
                searchTerm
            );
        console.log('Podcast:', podcast.episode.enclosureUrl);
        const fileUrl = podcast.episode.enclosureUrl;
        const localFilePath = await speechToTextService.downloadAudioToLocal(
            fileUrl
        );
        console.log('File downloaded to:', localFilePath);
        const text = await speechToTextService.convertSpeechToText(
            localFilePath
        );
        console.log('Speech to text result:', text);

        res.json(text);
    } catch (error) {
        console.error('Error in /episode_speech_to_text:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: error.message, stack: error.stack });
    }
});

router.post('/audio_summary', async (req, res) => {
    try {
        const { summaryText } = req.body;
        const audioBuffer = await textToAudioService.convertSummaryToAudio(
            summaryText
        );
        res.set('Content-Type', 'audio/mpeg');
        res.send(audioBuffer);
    } catch (error) {
        console.error('Error in /audio_summary:', error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/summary_translation', async (req, res) => {
    try {
        const { text } = req.body;

        console.log('text>>:', text);
        const translation = await translationService.translateText(text);
        console.log('translation:', translation);

        res.json(translation);
    } catch (error) {
        console.error('Error in /translation:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: error.message, stack: error.stack });
    }
});

router.post('/image', async (req, res) => {
    try {
        const { text } = req.body;

        console.log('text>>:', text);
        const image = await imageService.createImage(text);
        console.log('image route response:', image);

        res.json({ image: image });
    } catch (error) {
        console.error('Error in /image:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: error.message, stack: error.stack });
    }
});

router.post('/chat', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({
                error: 'Messages are required and should be an array.',
            });
        }

        console.log('messages>>:', messages);

        const response = await chatService.useChat(messages);
        console.log('chat route response:', response);

        res.json({ response });
    } catch (error) {
        console.error('Error in /chat:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: error.message, stack: error.stack });
    }
});
export default router;
