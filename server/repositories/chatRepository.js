import 'dotenv/config';
import { HuggingFaceRepository } from './huggingFaceRepository.js';

export class ChatRepository {
    constructor(huggingFaceRepository) {
        if (!(huggingFaceRepository instanceof HuggingFaceRepository)) {
            throw new Error('Invalid HuggingFace repository instance');
        }
        this.hf = huggingFaceRepository.getClient();
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) {
            console.warn('ChatRepository is already initialized');
            return;
        }

        try {
            // Any additional initialization logic can go here
            this.isInitialized = true;
            console.log('ChatRepository initialized successfully');
        } catch (error) {
            console.error('Failed to initialize ChatRepository:', error);
            throw new Error('Initialization error: ' + error.message);
        }
    }

    async performChat(messages) {
        await this.init();
        if (!this.isInitialized) {
            throw new Error(
                'ChatRepository is not initialized. Call init() first.'
            );
        }

        let responseText = '';
        for await (const chunk of this.hf.chatCompletionStream({
            model: 'HuggingFaceH4/zephyr-7b-beta',
            messages: messages,
            max_tokens: 500,
        })) {
            responseText += chunk.choices[0]?.delta?.content || '';
        }

        console.log('chat:', typeof messages);

        if (typeof responseText === 'object' && responseText) {
            console.log('chat:', responseText);
            return responseText;
        } else if (typeof responseText === 'string') {
            return responseText;
        } else {
            throw new Error('Unexpected chat result format');
        }
    }

    isReady() {
        return this.isInitialized;
    }

    reset() {
        this.isInitialized = false;
        console.log('ChatRepository reset');
    }
}

// Create and export a default instance
const defaultHuggingFaceRepository = new HuggingFaceRepository(
    process.env.HF_KEY
);
export const chatRepository = new ChatRepository(defaultHuggingFaceRepository);
