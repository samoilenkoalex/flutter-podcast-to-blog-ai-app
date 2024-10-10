import textToAudioRepository from '../repositories/textToAudioRepository.js';
import 'dotenv/config';
class TextToAudioService {
    constructor() {
        this.repository = textToAudioRepository;
    }

    async convertSummaryToAudio(text) {
        await this.repository.init();

        const result = await this.repository.performTextToAudio(text);
        console.log('audioResult:', result);
        return result;
    }
}

export default new TextToAudioService();
