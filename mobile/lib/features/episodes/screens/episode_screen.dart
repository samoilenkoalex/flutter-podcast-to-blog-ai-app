import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class EpisodeScreen extends StatelessWidget {
  const EpisodeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:
        AppBar(
          title: const Text('Episode'),
          automaticallyImplyLeading: true,
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: () {
              context.pop();
            },
          ),
        ),
      body:
        const Center(
          child: Text('Episode Screen'),
        ),
    );
  }
}
