import { ElevenLabsClient } from 'elevenlabs';

export async function initElevenlabsRepository() {
    const client = new ElevenLabsClient({
        apiKey: process.env.ELEVANLABS_KEY,
    });
    return client;
}
