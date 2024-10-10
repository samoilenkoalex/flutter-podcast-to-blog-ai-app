import 'dotenv/config';
import { initHuggingFaceRepository } from './huggingFaceRepository.js';

class SummarizerRepository {
    constructor() {
        this.hf = null;
    }

    async init() {
        this.hf = await initHuggingFaceRepository();
    }

    async performSummarization(text) {
        // Ensure text is a string
        if (typeof text !== 'string') {
            throw new Error('Input text must be a string');
        }

        const summary = await this.hf.summarization({
            model: 'facebook/bart-large-cnn',
            inputs: text,
            parameters: {
                max_length: 15,
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
    }
}

export default new SummarizerRepository();
