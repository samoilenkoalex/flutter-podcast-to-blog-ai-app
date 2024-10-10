import { readFileSync } from 'fs';
import 'dotenv/config';
import { initHuggingFaceRepository } from './huggingFaceRepository.js';

class SpeechToTextRepository {
    constructor() {
        this.hf = null;
    }

    async init() {
        this.hf = await initHuggingFaceRepository();
    }

    async performSpeechToText(filePath) {
        const audioData = readFileSync(filePath);
        const speechToTextResult = await this.hf.automaticSpeechRecognition({
            model: 'facebook/wav2vec2-large-960h-lv60-self',
            data: audioData,
        });

        // Check if the result is an object with a 'text' property
        if (typeof speechToTextResult === 'object' && speechToTextResult.text) {
            return speechToTextResult.text;
        } else if (typeof speechToTextResult === 'string') {
            return speechToTextResult;
        } else {
            throw new Error('Unexpected speech-to-text result format');
        }
    }
}

export default new SpeechToTextRepository();
