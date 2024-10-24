import 'dotenv/config';
import chatRepository from '../repositories/chatRepository.js';
class ChatService {
    constructor() {
        this.repository = chatRepository;
    }

    async useChat(message) {
        await this.repository.init();
        console.log('message:', message);
        const response = await this.repository.performChat(message);
        console.log('message response:', response);
        return response;
    }
}

export default new ChatService();
