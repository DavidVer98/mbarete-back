import { Entity, Column, ManyToOne } from 'typeorm'

import { BaseEntity } from '../common/entities/base.entity'
import { Folder } from '../folders/folder.entity'
import { User } from '../users/users.entity'

@Entity('tbl_boards')
export class Board extends BaseEntity {
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

  @ManyToOne(() => Folder, (folder) => folder.boards, { nullable: true })
  folder: Folder

  @Column({ nullable: true })
  folderId: number
}
