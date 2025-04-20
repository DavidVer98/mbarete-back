import { Entity, Column, OneToMany } from 'typeorm'

import { Board } from '../boards/board.entity'
import { BaseEntity } from '../common/entities/base.entity'
import { DayRoutine } from '../exercises/entities/day-routine.entity'
import { ExerciseProgressLog } from '../exercises/entities/exercise-progress-log.entity'
import { Routine } from '../exercises/entities/routine.entity'
import { Folder } from '../folders/folder.entity'

@Entity('tbl_users')
export class User extends BaseEntity {
  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(() => Board, (board) => board.owner)
  boards: Board[]

  @OneToMany(() => Folder, (folder) => folder.owner)
  folders: Folder[]

  @OneToMany(() => Routine, (routine) => routine.owner)
  routines: Routine[]

  @OneToMany(() => ExerciseProgressLog, (exerciseProgressLog) => exerciseProgressLog.user)
  exerciseProgressLogs: ExerciseProgressLog[]

  @OneToMany(() => DayRoutine, (dayRoutine) => dayRoutine.user)
  dayRoutines: DayRoutine[]
}
