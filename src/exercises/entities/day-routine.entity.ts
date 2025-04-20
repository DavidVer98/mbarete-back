import { Entity, Column, ManyToOne } from 'typeorm'

import { Routine } from './routine.entity'
import { BaseEntity } from '../../common/entities/base.entity'
import { User } from '../../users/users.entity'

@Entity('tbl_days-routines')
export class DayRoutine extends BaseEntity {
  @ManyToOne(() => Routine, (routine) => routine.dayRoutines)
  routine: Routine

  @Column({ nullable: false })
  routineId: number

  //dayOfWeek int [note: '0 = Domingo, 1 = Lunes, 2 = Martes, 3 = Miércoles, 4 = Jueves, 5 = Viernes, 6 = Sábado']

  @Column({ nullable: false })
  dayOfWeek: number

  @Column({ nullable: false })
  order: number

  @ManyToOne(() => User, (user) => user.dayRoutines)
  user: User

  @Column({ nullable: false })
  userId: number
}
