part of 'summarize_bloc.dart';

sealed class SummarizeState extends Equatable {}

 class SummarizeInitial extends SummarizeState {
  @override
  List<Object> get props => [];
}

class SummarizeLoading extends SummarizeState {
  @override
  List<Object> get props => [];
}

class SummarizeLoaded extends SummarizeState {
  final String summary;

  SummarizeLoaded({required this.summary});

  @override
  List<Object> get props => [summary];
}

class SummarizeError extends SummarizeState {
  final String message;

  SummarizeError({required this.message});

  @override
  List<Object> get props => [message];
}
