import 'dart:convert';

import 'package:http/http.dart' as http;

import '../features/podcast/models/podcast_model.dart';

const String baseUrl = 'http://localhost:3000/api';

class ApiService {
  Future<PodcastModel> getPodcastEpisodes({
    required String id,
  }) async {
    dynamic result = [];
    final response = await http.post(
      Uri.parse('$baseUrl/getEpisodes'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'searchTerm': id,
      }),
    );

    if (response.statusCode == 200) {
      result = PodcastModel.fromJson(response.body);
    } else {
      result = 'Failed to fetch summary';
    }
    return result;
  }
}
