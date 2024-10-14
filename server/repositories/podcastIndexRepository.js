import { initPodcastIndexClient } from '../clients/podcastIndexClient.js';

class PodcastIndexRepository {
    constructor() {
        this.podcastIndexClient = null;
    }

    async init() {
        this.podcastIndexClient = await initPodcastIndexClient();
    }

    async performPodcastSearch() {
        if (!this.podcastIndexClient) {
            throw new Error(
                'PodcastIndexClient is not initialized. Call init() first.'
            );
        }

        const result = await this.podcastIndexClient.episodesByItunesId(
            '1751735078'
        );
        return result;
    }

    async performEpisodesByIdSearch() {
        if (!this.podcastIndexClient) {
            throw new Error(
                'PodcastIndexClient is not initialized. Call init() first.'
            );
        }

        const result = await this.podcastIndexClient.episodeById('27211628824');
        return result;
    }
}

export default new PodcastIndexRepository();
