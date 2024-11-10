import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('tbl_diagrams')
export class Diagram {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ nullable: false })
  name: string

  @Column('text')
  content: string // JSON stringified Excalidraw data

  @Column()
  userId: string
}
