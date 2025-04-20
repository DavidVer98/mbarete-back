export class TodayRoutineExerciseDto {
  id: number
  name: string
  description: string
  muscleGroup: string
}

export class TodayRoutineDto {
  id: number
  name: string
  description: string
  exercises: TodayRoutineExerciseDto[]
}
