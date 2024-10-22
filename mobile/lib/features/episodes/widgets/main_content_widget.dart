import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:intl/intl.dart';

import '../../podcast/models/podcast_model.dart';
import '../bloc/speech_to_text/speech_to_text_bloc.dart';
import 'audio_player_widget.dart';

class MainContentWidget extends StatefulWidget {
  final Item item;

  const MainContentWidget({
    super.key,
    required this.item,
  });

  @override
  MainContentWidgetState createState() => MainContentWidgetState();
}

class MainContentWidgetState extends State<MainContentWidget> {
  late AudioPlayer player = AudioPlayer();

  @override
  void initState() {
    // Create the audio player.
    player = AudioPlayer();

    // Set the release mode to keep the source after playback has completed.
    player.setReleaseMode(ReleaseMode.stop);

    // Start the player as soon as the app is displayed.
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      // await player.setSource(UrlSource(widget.item.enclosureUrl ?? ''));
      await player.stop();
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Image.network(
              widget.item.feedImage.toString(),
              height: 200,
            ),
            const SizedBox(
              height: 10,
            ),
            Text(
              maxLines: 4,
              overflow: TextOverflow.ellipsis,
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w400),
              Bidi.stripHtmlIfNeeded(widget.item.description.toString()),
            ),
            const SizedBox(
              height: 20,
            ),
            const Text(
              maxLines: 4,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
              'Listen to original podcast',
            ),
            PlayerWidget(player: player),
            // TextButton(
            //   onPressed: () {
            //     context.read<SummarizeBloc>().add(FetchSummary(id: widget.item.id.toString()));
            //   },
            //   child: Text('Summarize'),
            // ),
            // BlocBuilder<SummarizeBloc, SummarizeState>(builder: (context, state) {
            //   if (state is SummarizeLoading) {
            //     return const CircularProgressIndicator();
            //   } else if (state is SummarizeLoaded) {
            //     return Column(
            //       children: [
            //         Text(state.summary),
            //         TextButton(
            //             onPressed: () {
            //               ApiService().getAudio(
            //                 summary: state.summary,
            //               );
            //             },
            //             child: Text('Download Audio')),
            //         TextButton(
            //             onPressed: () async {
            //               try {
            //                 final audioBytes = await ApiService().getAudio(summary: state.summary);
            //                 final filePath = await ApiService().saveRawResponse(audioBytes);
            //                 log('filePath>>>>> $filePath');
            //
            //                 final file = File(filePath);
            //                 if (await file.exists()) {
            //                   log('File exists and its size is: ${await file.length()} bytes');
            //                 } else {
            //                   log('File does not exist');
            //                   return;
            //                 }
            //                 await player.play(DeviceFileSource(filePath));
            //               } catch (e, stackTrace) {
            //                 log('Error playing audio: $e');
            //                 log('Stack trace: $stackTrace');
            //               }
            //             },
            //             child: Text('PLAY Audio'))
            //       ],
            //     );
            //   } else if (state is SummarizeError) {
            //     return const Text('Failed to fetch subtitles');
            //   } else {
            //     return const Text('Start Searching ');
            //   }
            // }),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: FilledButton(
                onPressed: () {
                  context.read<SpeechToTextBloc>().add(FetchSpeechToText(id: widget.item.id.toString()));
                },
                child: const Text('Show text Version'),
              ),
            ),
            BlocBuilder<SpeechToTextBloc, SpeechToTextState>(builder: (context, state) {
              if (state is SpeechToTextLoading) {
                return const CircularProgressIndicator();
              } else if (state is SpeechToTextLoaded) {
                return Text(state.text);
              } else if (state is SpeechToTextError) {
                return const Text('Failed to fetch subtitles');
              } else {
                return const SizedBox.shrink();
              }
            })
          ],
        ),
      ),
    );
  }
}
