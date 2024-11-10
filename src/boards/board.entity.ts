import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm'

import { Folder } from '../folders/folder.entity'
import { User } from '../users/users.entity'

@Entity('tbl_boards')
export class Board {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'text', nullable: true })
  elements: string

  @ManyToOne(() => User, (user) => user.boards)
  owner: User

  @Column()
  ownerId: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => Folder, (folder) => folder.boards, { nullable: true })
  folder: Folder

  @Column({ nullable: true })
  folderId: number
}
