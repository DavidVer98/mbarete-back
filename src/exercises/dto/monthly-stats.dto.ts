export class MonthlyStatsDto {
  totalWorkouts: number // Number of days with activity
  totalExercises: number // Total number of sets performed
  totalWeight: number // Total weight lifted (weight × reps)
  totalReps: number // Total repetitions
  personalRecords: number // Number of PRs achieved this month
  mostFrequentExercise?: {
    // Most frequently performed exercise
    exerciseId: number
    name: string
    count: number
  }
  bestDay?: {
    // Day with most weight lifted
    date: string
    totalWeight: number
  }
  maxWeightExercise?: {
    // Exercise with the highest weight lifted
    exerciseId: number
    name: string
    weight: number
    reps: number
    date: string
  }
  maxRepsExercise?: {
    // Exercise with the highest repetitions achieved
    exerciseId: number
    name: string
    reps: number
    weight: number
    date: string
  }
}
