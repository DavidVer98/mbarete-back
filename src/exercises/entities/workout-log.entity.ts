import { Column, Entity, ManyToOne } from 'typeorm'

import { RoutineExercise } from './routine-exercise.entity'
import { BaseEntity } from '../../common/entities/base.entity'

@Entity('tbl_workout-log')
export class WorkoutLog extends BaseEntity {
  @Column({ nullable: false })
  sets: number

  @Column({ nullable: false })
  reps: number

  @Column({ nullable: false })
  weight: number

  @ManyToOne(() => RoutineExercise, (routineExercise) => routineExercise.workoutLogs)
  routineExercise: RoutineExercise
}
