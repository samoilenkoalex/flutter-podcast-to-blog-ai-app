import imageRepository from '../repositories/imageRepository.js';
import 'dotenv/config';

class ImageService {
    constructor() {
        this.repository = imageRepository;
    }

    async createImage(text) {
        await this.repository.init();
        console.log('image11:', text);
        const image = await this.repository.performTextToImage(text);
        console.log('image response:', image);
        return image;
    }
}

export default new ImageService();
