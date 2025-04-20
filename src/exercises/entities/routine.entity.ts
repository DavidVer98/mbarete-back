import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'

import { DayRoutine } from './day-routine.entity'
import { RoutineExercise } from './routine-exercise.entity'
import { BaseEntity } from '../../common/entities/base.entity'
import { User } from '../../users/users.entity'

@Entity('tbl_routines')
export class Routine extends BaseEntity {
  @Column({ nullable: false })
  name: string

  @Column()
  description: string

  @ManyToOne(() => User, (user) => user.routines)
  owner: User

  @Column()
  ownerId: number

  @OneToMany(() => RoutineExercise, (routineExercise) => routineExercise.routine)
  routineExercises: RoutineExercise[]

  @Column({ default: false })
  isPublic: boolean

  @OneToMany(() => DayRoutine, (dayRoutine) => dayRoutine.routine)
  dayRoutines: DayRoutine[]
}
