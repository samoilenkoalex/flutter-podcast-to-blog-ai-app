import summarizationRepository from '../repositories/summarizerRepository.js';
import 'dotenv/config';
class SummarizationService {
    constructor() {
        this.repository = summarizationRepository;
    }

    async summarizeResult(text) {
        await this.repository.init();
        console.log('Text to summarize:', text);
        console.log('Text to summarize type:', typeof text);
        const summary = await this.repository.performSummarization(text);
        console.log('Summary:', summary);
        return summary;
    }
}

export default new SummarizationService();
