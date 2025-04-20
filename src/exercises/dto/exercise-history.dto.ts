export class ExerciseSetDto {
  reps: string
  weight: string
  isNewRecord: boolean
}

export class ExerciseHistoryEntryDto {
  date: string
  sets: ExerciseSetDto[]
}

export type ExerciseHistoryResponseDto = ExerciseHistoryEntryDto[]
