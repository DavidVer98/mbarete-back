import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'

import { Board } from '../boards/board.entity'
import { Folder } from '../folders/folder.entity'

@Entity('tbl_users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(() => Board, (board) => board.owner)
  boards: Board[]

  @OneToMany(() => Folder, (folder) => folder.owner)
  folders: Folder[]

  // @Column({ type: 'text', nullable: true })
  // avatarUrl: string
}
