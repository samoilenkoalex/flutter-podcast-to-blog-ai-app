import axios from 'axios';
import 'dotenv/config';
import { initHuggingFaceRepository } from './huggingFaceRepository.js';
import fs from 'fs';
import path from 'path';

class SpeechToTextRepository {
    constructor() {
        this.hf = null;
    }

    async init() {
        this.hf = await initHuggingFaceRepository();
    }

    async fetchAudioData(fileUrl) {
        const response = await axios({
            url: fileUrl,
            method: 'GET',
            responseType: 'arraybuffer',
        });
        return response.data;
    }

    async readFileChunk(filePath, start, end) {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(filePath, { start, end });
            const chunks = [];
            stream.on('data', (chunk) => chunks.push(chunk));
            stream.on('end', () => resolve(Buffer.concat(chunks)));
            stream.on('error', reject);
        });
    }

    async transcribeChunk(audioChunk) {
        const speechToTextResult = await this.hf.automaticSpeechRecognition({
            model: 'facebook/wav2vec2-large-960h-lv60-self',
            data: audioChunk,
        });

        if (typeof speechToTextResult === 'object' && speechToTextResult.text) {
            return speechToTextResult.text;
        } else if (typeof speechToTextResult === 'string') {
            return speechToTextResult;
        } else {
            throw new Error('Unexpected speech-to-text result format');
        }
    }

    async performSpeechToText(filePath, chunkSize = 1 * 1024 * 1024) {
        // 1MB chunks by default
        console.log('filePath:', filePath);
        const fileSize = fs.statSync(filePath).size;
        const chunks = Math.ceil(fileSize / chunkSize);
        let fullTranscription = '';

        for (let i = 0; i < chunks; i++) {
            const start = i * chunkSize;
            const end = Math.min((i + 1) * chunkSize - 1, fileSize - 1);

            const audioChunk = await this.readFileChunk(filePath, start, end);

            const chunkTranscription = await this.transcribeChunk(audioChunk);

            fullTranscription += chunkTranscription + ' ';
        }

        return fullTranscription.trim();
    }

    async performDownloadFile(url) {
        const localFilePath = path.resolve('./uploads', 'podcast_episode.mp3');

        const writer = fs.createWriteStream(localFilePath);
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
        });

        // Pipe the response data to the write stream
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve(localFilePath));
            writer.on('error', reject);
        });
    }
}

export default new SpeechToTextRepository();
