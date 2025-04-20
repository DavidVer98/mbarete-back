import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'

import { ExerciseProgressLog } from './exercise-progress-log.entity'
import { Exercise } from './exercise.entity'
import { Routine } from './routine.entity'
import { WorkoutLog } from './workout-log.entity'
import { BaseEntity } from '../../common/entities/base.entity'

@Entity('tbl_routines-exercises')
export class RoutineExercise extends BaseEntity {
  @ManyToOne(() => Routine, (routine) => routine.routineExercises)
  routine: Routine

  @Column()
  routineId: number

  @ManyToOne(() => Exercise, (exercise) => exercise.routineExercises)
  exercise: Exercise

  @Column()
  exerciseId: number

  @OneToMany(
    () => ExerciseProgressLog,
    (exerciseProgressLog) => exerciseProgressLog.routineExercise,
  )
  exerciseProgressLogs: ExerciseProgressLog[]

  @OneToMany(() => WorkoutLog, (workoutLog) => workoutLog.routineExercise)
  workoutLogs: WorkoutLog[]
}
