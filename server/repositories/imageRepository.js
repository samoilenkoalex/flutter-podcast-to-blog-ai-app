import 'dotenv/config';
import { HuggingFaceRepository } from './huggingFaceRepository.js';
export class ImageRepository {
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
            console.warn('ImageRepository is already initialized');
            return;
        }

        try {
            this.hfClient = this.huggingFaceRepository.getClient();
            this.isInitialized = true;
            console.log('ImageRepository initialized successfully');
        } catch (error) {
            console.error(
                'Failed to initialize Hugging Face repository:',
                error
            );
            throw new Error('Initialization error: ' + error.message);
        }
    }

    async performTextToImage(text) {
        if (!this.isInitialized) {
            throw new Error(
                'ImageRepository is not initialized. Call init() first.'
            );
        }

        if (!text || typeof text !== 'string') {
            throw new Error('Invalid input: text must be a non-empty string');
        }

        try {
            console.log('Generating image for text:', text);
            const imageBlob = await this.hfClient.textToImage({
                model: 'ZB-Tech/Text-to-Image',
                inputs: text,
            });

            console.info('Image generation completed successfully');

            if (imageBlob instanceof Blob) {
                return this.blobToBase64(imageBlob);
            } else if (typeof imageBlob === 'string') {
                return Buffer.from(imageBlob).toString('base64');
            } else {
                throw new Error('Unexpected image result format');
            }
        } catch (error) {
            console.error('Error during text-to-image generation:', error);
            throw new Error('Image generation failed: ' + error.message);
        }
    }

    async blobToBase64(blob) {
        if (!(blob instanceof Blob)) {
            throw new Error('Invalid input: expected Blob instance');
        }

        try {
            const arrayBuffer = await blob.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            return buffer.toString('base64');
        } catch (error) {
            console.error('Error converting Blob to Base64:', error);
            throw new Error(
                'Blob to Base64 conversion failed: ' + error.message
            );
        }
    }

    // Additional utility methods could be added here

    isReady() {
        return this.isInitialized;
    }

    reset() {
        this.hfClient = null;
        this.isInitialized = false;
        console.log('ImageRepository reset');
    }
}

// Create and export a default instance
const defaultHuggingFaceRepository = new HuggingFaceRepository(
    process.env.HF_KEY || ''
);
export default new ImageRepository(defaultHuggingFaceRepository);
