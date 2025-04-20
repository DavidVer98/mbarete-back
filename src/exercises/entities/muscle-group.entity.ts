import { Entity, Column, OneToMany } from 'typeorm'

import { Exercise } from './exercise.entity'
import { BaseEntity } from '../../common/entities/base.entity'
@Entity('tbl_muscle_groups')
export class MuscleGroup extends BaseEntity {
  @Column({ nullable: false })
  name: string

  @OneToMany(() => Exercise, (exercise) => exercise.muscleGroup)
  exercises: Exercise[]
}
