import 'package:flutter/material.dart';

import '../widgets/podcast_episoddes_list.dart';
// final result = await searchPodcast('EdTech Shorts');

class PodcastScreen extends StatelessWidget {
  const PodcastScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Podcast Screen'),
      ),
      body: const PodcastEpisoddesList(),
    );
  }
}
