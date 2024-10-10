import speechToTextRepository from '../repositories/speechToTextRepository.js';
import { ElevenLabsClient, ElevenLabs } from 'elevenlabs';
import 'dotenv/config';
class SpeechToTextService {
    constructor() {
        this.repository = speechToTextRepository;
    }

    async convertSpeechToText(filePath) {
        await this.repository.init();
        const text = await this.repository.performSpeechToText(filePath);
        console.log('Converted text:', text);
        console.log('Converted text type:', typeof text);
        return text;
    }
}

export default new SpeechToTextService();
