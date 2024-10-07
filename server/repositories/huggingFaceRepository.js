import { HfInference } from '@huggingface/inference';

export async function initHuggingFaceService() {
    const hf = new HfInference(process.env.HF_KEY);
    return hf;
}
