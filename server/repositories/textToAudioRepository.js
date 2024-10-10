import 'dotenv/config';
import { initElevenlabsRepository } from './elevenLabsRepository.js';
import { ElevenLabs } from 'elevenlabs';

class TextToAudioRepository {
    constructor() {
        this.elevenLabsClient = null;
    }

    async init() {
        this.elevenLabsClient = await initElevenlabsRepository();
    }

    async performTextToAudio(text) {
        const response = await this.elevenLabsClient.textToSpeech.convert(
            'pMsXgVXv3BLzUgSXRplE',
            {
                optimize_streaming_latency:
                    ElevenLabs.OptimizeStreamingLatency.Zero,
                output_format: ElevenLabs.OutputFormat.Mp32205032,
                text: text,
                voice_settings: {
                    stability: 0.1,
                    similarity_boost: 0.3,
                    style: 0.2,
                },
            }
        );

        const audioBuffer = await this.streamToBuffer(response);
        console.log('Audio buffer length:', audioBuffer.length);
        return audioBuffer;
    }

    async streamToBuffer(stream) {
        const chunks = [];
        for await (const chunk of stream) {
            chunks.push(chunk);
        }
        return Buffer.concat(chunks);
    }
}

export default new TextToAudioRepository();
