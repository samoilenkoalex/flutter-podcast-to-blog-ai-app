import { HfInference } from '@huggingface/inference';
import { readFileSync } from 'fs';
import 'dotenv/config';
export async function initHuggingFaceService() {
    const hf = new HfInference(process.env.HF_KEY); // Use the Hugging Face API Key from env
    return hf;
}

class SpeechToTextRepository {
    constructor() {
        this.hf = null;
    }

    async init() {
        this.hf = await initHuggingFaceService();
    }

    async performSpeechToText(filePath) {
        const audioData = readFileSync(filePath);
        const speechToTextResult = await this.hf.automaticSpeechRecognition({
            model: 'facebook/wav2vec2-large-960h-lv60-self',
            data: audioData,
        });
        return speechToTextResult;
    }
}

export default new SpeechToTextRepository();
