import 'dotenv/config';
import { HuggingFaceRepository } from './huggingFaceRepository.js';

export class SummarizerRepository {
    constructor(huggingFaceRepository) {
        if (!(huggingFaceRepository instanceof HuggingFaceRepository)) {
            throw new Error('Invalid HuggingFaceRepository instance');
        }
        this.hfClient = null;
        this.huggingFaceRepository = huggingFaceRepository;
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) {
            console.warn('SummarizerRepository is already initialized');
            return;
        }

        try {
            this.hfClient = this.huggingFaceRepository.getClient();
            this.isInitialized = true;
            console.log('SummarizerRepository initialized successfully');
        } catch (error) {
            console.error(
                'Failed to initialize Hugging Face repository:',
                error
            );
            throw new Error('Initialization error: ' + error.message);
        }
    }

    async performSummarization(text) {
        if (!this.isInitialized) {
            throw new Error(
                'SummarizerRepository is not initialized. Call init() first.'
            );
        }

        if (typeof text !== 'string') {
            throw new Error('Input text must be a string');
        }

        try {
            const summary = await this.hfClient.summarization({
                model: 'facebook/bart-large-cnn',
                inputs: text,
                parameters: {
                    max_length: 100,
                    min_length: 10,
                },
            });

            console.log('Raw summary result:', summary);

            if (typeof summary === 'object' && summary.summary_text) {
                return summary.summary_text;
            } else if (typeof summary === 'string') {
                return summary;
            } else {
                throw new Error('Unexpected summarization result format');
            }
        } catch (error) {
            console.error('Error performing summarization:', error);
            throw new Error('Summarization failed: ' + error.message);
        }
    }

    isReady() {
        return this.isInitialized;
    }

    reset() {
        this.hfClient = null;
        this.isInitialized = false;
        console.log('SummarizerRepository reset');
    }
}

// Create and export a default instance
const defaultHuggingFaceRepository = new HuggingFaceRepository(
    process.env.HF_KEY || ''
);
export default new SummarizerRepository(defaultHuggingFaceRepository);
