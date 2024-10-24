import podcastIndexRepository from '../repositories/podcastIndexRepository.js';
class PodcastIndexService {
    constructor() {
        this.repository = podcastIndexRepository;
    }

    async performPodcastIndexSearch({ searchTerm, limit, offset }) {
        await this.repository.init();
        const searchResult = await this.repository.performPodcastSearch({
            searchTerm,
            limit,
            offset,
        });

        return searchResult;
    }

    async performPodcastIndexEpisodesSearch() {
        await this.repository.init();
        const searchResult = await this.repository.performEpisodesByIdSearch();

        return searchResult;
    }
}

export default new PodcastIndexService();
