import 'dotenv/config';
import { initHuggingFaceRepository } from './huggingFaceRepository.js';
class ChatRepository {
    constructor() {
        this.hf = null;
    }

    async init() {
        this.hf = await initHuggingFaceRepository();
    }

    async performChat(messages) {
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
}

export default new ChatRepository();
