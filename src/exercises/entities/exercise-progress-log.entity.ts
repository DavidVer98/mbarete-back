import { Entity, Column, ManyToOne } from 'typeorm'

import { Exercise } from './exercise.entity'
import { RoutineExercise } from './routine-exercise.entity'
import { BaseEntity } from '../../common/entities/base.entity'
import { User } from '../../users/users.entity'

@Entity('tbl_exercise_progress_logs')
export class ExerciseProgressLog extends BaseEntity {
  @ManyToOne(() => User, (user) => user.exerciseProgressLogs)
  user: User

  @Column()
  userId: number

  @ManyToOne(() => RoutineExercise, (routineExercise) => routineExercise.exerciseProgressLogs)
  routineExercise: RoutineExercise

  @Column({ nullable: true })
  routineExerciseId: number

  // @Column()
  // setNumber: number

  @Column()
  reps: number

  @Column()
  weight: number

  @Column()
  isNewRecord: boolean

  @ManyToOne(() => Exercise, (exercise) => exercise.exerciseProgressLogs)
  exercise: Exercise

  @Column({ nullable: true })
  exerciseId: number
}
