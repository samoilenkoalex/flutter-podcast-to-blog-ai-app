import 'dotenv/config';
import { initHuggingFaceRepository } from './huggingFaceRepository.js';

class ImageRepository {
    constructor() {
        this.hf = null;
    }

    async init() {
        this.hf = await initHuggingFaceRepository();
    }

    async performTextToImage(text) {
        const imageBlob = await this.hf.textToImage({
            model: 'ZB-Tech/Text-to-Image',
            inputs: text,
        });

        console.log('image:', typeof imageBlob);

        if (imageBlob instanceof Blob) {
            const base64Image = await blobToBase64(imageBlob);
            return base64Image;
        } else if (typeof imageBlob === 'string') {
            const base64Image = Buffer.from(imageBlob).toString('base64');
            return base64Image;
        } else {
            throw new Error('Unexpected image result format');
        }
    }
}

// Helper function to convert Blob to Base64 using ArrayBuffer and Buffer
async function blobToBase64(blob) {
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer.toString('base64');
}

export default new ImageRepository();
