import speechToTextRepository from '../repositories/speechToTextRepository.js';

class SpeechToTextService {
    constructor() {
        this.repository = speechToTextRepository;
    }

    async convertSpeechToText(filePath) {
        await this.repository.init(); // Ensure repository is initialized
        return await this.repository.performSpeechToText(filePath);
    }
}

export default new SpeechToTextService();
