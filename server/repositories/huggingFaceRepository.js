import { HfInference } from '@huggingface/inference';

export async function initHuggingFaceRepository() {
    const hf = new HfInference(process.env.HF_KEY);
    return hf;
}
