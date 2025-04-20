import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'

import { ExerciseProgressLog } from './exercise-progress-log.entity'
import { MuscleGroup } from './muscle-group.entity'
import { RoutineExercise } from './routine-exercise.entity'
import { BaseEntity } from '../../common/entities/base.entity'

@Entity('tbl_exercises')
export class Exercise extends BaseEntity {
  @Column({ nullable: false })
  name: string

  @Column()
  description: string

  @ManyToOne(() => MuscleGroup, (muscleGroup) => muscleGroup.exercises)
  muscleGroup: MuscleGroup

  @OneToMany(() => RoutineExercise, (routineExercise) => routineExercise.exercise)
  routineExercises: RoutineExercise[]

  @OneToMany(() => ExerciseProgressLog, (exerciseProgressLog) => exerciseProgressLog.exercise)
  exerciseProgressLogs: ExerciseProgressLog[]
}
