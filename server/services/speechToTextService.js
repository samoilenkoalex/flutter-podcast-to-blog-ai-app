import speechToTextRepository from '../repositories/speechToTextRepository.js';
import 'dotenv/config';

class SpeechToTextService {
    constructor() {
        this.repository = speechToTextRepository;
    }

    async convertSpeechToText(fileUrl) {
        await this.repository.init();

        const text = await this.repository.performSpeechToText(fileUrl);
        console.log('Converted text:', text);
        console.log('Converted text type:', typeof text);
        return text;
    }

    async downloadAudioToLocal(fileUrl) {
        await this.repository.init();
        const file = await this.repository.performDownloadFile(fileUrl);
        console.log('audio Url:', file);
        return file;
    }
}

export default new SpeechToTextService();
