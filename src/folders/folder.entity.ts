// src/folders/entities/folder.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm'

import { Board } from '../boards/board.entity'
import { User } from '../users/users.entity'

@Entity('tbl_folders')
export class Folder {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'text', nullable: true })
  description: string

  @ManyToOne(() => User, (user) => user.folders)
  owner: User

  @Column()
  ownerId: number

  @ManyToOne(() => Folder, (folder) => folder.subfolders, { nullable: true })
  parentFolder: Folder

  @Column({ nullable: true })
  parentFolderId: number

  @OneToMany(() => Folder, (folder) => folder.parentFolder)
  subfolders: Folder[]

  @OneToMany(() => Board, (board) => board.folder)
  boards: Board[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
