import 'dotenv/config';
import { initHuggingFaceRepository } from './huggingFaceRepository.js';
class TranslationRepository {
    constructor() {
        this.hf = null;
    }

    async init() {
        this.hf = await initHuggingFaceRepository();
    }

    async performTranslation(text) {
        const translation = await this.hf.translation({
            model: 'Helsinki-NLP/opus-mt-en-fr',
            inputs: text,
        });

        console.log('translation:', typeof translation);

        if (typeof translation === 'object' && translation) {
            console.log('translation:', translation);
            return translation;
        } else if (typeof translation === 'string') {
            return translation;
        } else {
            throw new Error('Unexpected translation result format');
        }
    }
}

export default new TranslationRepository();
