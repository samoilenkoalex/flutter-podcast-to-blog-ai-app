import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';

import '../../../../services/api_service.dart';

part 'summarize_event.dart';
part 'summarize_state.dart';

class SummarizeBloc extends Bloc<SummarizeEvent, SummarizeState> {
  final ApiService _apiService = GetIt.I<ApiService>();

  SummarizeBloc() : super(SummarizeInitial()) {
    on<FetchSummary>(_onFetchSummary);
  }

  _onFetchSummary(FetchSummary event, Emitter<SummarizeState> emit) async {
    try {
      emit(SummarizeLoading());
      String summary = await _apiService.getEpisodeSummary(id: event.id);
      emit(SummarizeLoaded(summary: summary));
    } catch (e) {
      emit(SummarizeError(message: e.toString()));
    }
  }
}
