import 'dart:convert';
import 'dart:developer';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:path_provider/path_provider.dart';

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

  Future<String> getEpisodeSummary({
    required String id,
  }) async {
    dynamic result = [];
    final response = await http.post(
      Uri.parse('$baseUrl/episodeSummarize'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'searchTerm': id,
      }),
    );

    if (response.statusCode == 200) {
      result = response.body;
    } else {
      result = 'Failed to fetch summary';
    }
    return result;
  }

  Future<String> getSpeechToText({
    required String id,
  }) async {
    dynamic result = [];
    final response = await http.post(
      Uri.parse('$baseUrl/episodeSpeechToText'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'searchTerm': id,
      }),
    );

    if (response.statusCode == 200) {
      result = response.body;
    } else {
      result = 'Failed to fetch summary';
    }
    return result;
  }

  Future<List<int>> getAudio({required String summary}) async {
    final response = await http.post(
      Uri.parse('$baseUrl/summarizedAudio'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'summaryText': summary,
      }),
    );

    if (response.statusCode == 200) {
      log('Response Content-Type: ${response.headers['content-type']}');
      log('Response body length: ${response.bodyBytes.length}');

      if (response.headers['content-type'] != 'audio/mpeg') {
        throw Exception('Unexpected content type: ${response.headers['content-type']}');
      }

      return response.bodyBytes;
    } else {
      throw Exception('Failed to fetch audio: ${response.statusCode}');
    }
  }

  Future<String> saveRawResponse(List<int> data) async {
    final directory = await getApplicationDocumentsDirectory();
    final path = directory.path;
    final file = File('$path/raw_response.mp3');
    await file.writeAsBytes(data);
    log('Raw response saved to: ${file.path}');
    return file.path;
  }
}
