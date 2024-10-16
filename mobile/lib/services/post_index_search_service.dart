import 'package:podcast_search/podcast_search.dart';


Future<int?> searchPodcast(String query) async{
  final  search = Search();

  /// Search for podcasts with 'widgets' in the title.
  final  results =
      await search.search(query);

  /// List the name of each podcast found.
  // for (var result in results.items) {
  //   print('Found podcast: ${result.collectionId}');
  // }

  return results.items[0].collectionId;
}