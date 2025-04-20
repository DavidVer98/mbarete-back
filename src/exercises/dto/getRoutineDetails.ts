export class RoutineDetailDto {
  id: number
  name: string
  description: string
  routineExercises: {
    id: number
    exercise: {
      id: number
      name: string
      description: string
      muscleGroup: string
    }
  }[]
  dayRoutines: {
    id: number
    dayOfWeek: number
    order: number
  }[]
}
