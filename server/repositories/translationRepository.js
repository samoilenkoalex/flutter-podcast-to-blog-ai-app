import 'dotenv/config';
import { HuggingFaceRepository } from './huggingFaceRepository.js';
export class TranslationRepository {
    constructor(huggingFaceRepository) {
        if (!(huggingFaceRepository instanceof HuggingFaceRepository)) {
            throw new Error('Invalid HuggingFaceRepository instance');
        }
        this.huggingFaceRepository = huggingFaceRepository;
        this.hfClient = null;
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) {
            console.warn('TranslationRepository is already initialized');
            return;
        }

        try {
            this.hfClient = this.huggingFaceRepository.getClient();
            console.log('HF Client received:', !!this.hfClient);
            this.isInitialized = true;
            console.log('TranslationRepository initialized successfully');
        } catch (error) {
            console.error(
                'Failed to initialize Hugging Face repository:',
                error
            );
            throw new Error('Initialization error: ' + error.message);
        }
    }

    async performTranslation(text) {
        if (!this.isInitialized) {
            throw new Error(
                'TranslationRepository is not initialized. Call init() first.'
            );
        }

        if (typeof text !== 'string' || text.trim().length === 0) {
            throw new Error('Invalid input: text must be a non-empty string');
        }

        try {
            console.log('Attempting translation with client:', !!this.hfClient);
            const translation = await this.hfClient.translation({
                model: 'Helsinki-NLP/opus-mt-en-fr',
                inputs: text,
            });

            console.log('Translation result type:', typeof translation);

            if (typeof translation === 'object' && translation) {
                console.log('Translation result:', translation);
                return translation;
            } else if (typeof translation === 'string') {
                return translation;
            } else {
                throw new Error('Unexpected translation result format');
            }
        } catch (error) {
            console.error('Error during translation:', error);
            throw new Error('Translation failed: ' + error.message);
        }
    }
}
export default new TranslationRepository(
    new HuggingFaceRepository(process.env.HF_KEY || '')
);
