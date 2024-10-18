import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:podcast_index_app/features/episodes/screens/episode_screen.dart';

import '../features/podcast/screens/podcast_screen.dart';

/* * * * * * * * * * * *
*
* /home
* /pages
*     /pages/1
*     /pages/2
*     ...
*     /pages/test
*
* * * * * * * * * * * */

const String podcastsRoute = '/podcasts';
const String episodesRoute = '/episodes';

final globalNavigationKey = GlobalKey<NavigatorState>(debugLabel: 'global');

//todo: disabled for MVP
// final _shellNavigatorFilesKey = GlobalKey<NavigatorState>(debugLabel: 'files');

final goRouter = GoRouter(
  navigatorKey: globalNavigationKey,
  initialLocation: podcastsRoute,
  routes: [
    GoRoute(
      path: podcastsRoute,
      pageBuilder: (context, state) => _TransitionPage(
        key: state.pageKey,
        child: const PodcastScreen(),
      ),
    ),
    GoRoute(
      path: episodesRoute,
      pageBuilder: (context, state) {
        final extra = state.extra! as Map<dynamic, dynamic>;

        return _TransitionPage(
          key: state.pageKey,
          child: EpisodeScreen(
            item: extra['item'],
          ),
        );
      },
    ),
  ],
);

class _TransitionPage extends CustomTransitionPage<dynamic> {
  _TransitionPage({super.key, required super.child})
      : super(
          transitionsBuilder: (context, animation, secondaryAnimation, child) => FadeTransition(opacity: animation, child: child),
        );
}
