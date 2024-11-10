import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Board } from './board.entity'
import { User } from '../users/users.entity'

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  async findAllByUser(userId: number): Promise<Board[]> {
    return this.boardsRepository.find({ where: { ownerId: userId } })
  }

  async create(name: string, description: string, owner: User, folderId: number): Promise<Board> {
    const board = this.boardsRepository.create({ name, description, owner, folderId })
    return this.boardsRepository.save(board)
  }

  async findOne(id: number): Promise<Board> {
    const board = await this.boardsRepository.findOne({ where: { id }, relations: ['owner'] })
    if (!board) {
      throw new NotFoundException(`Board with ID "${id}" not found`)
    }
    return board
  }

  async update(
    id: number,
    updateData: { name?: string; description?: string; elements?: string },
    user: User,
  ): Promise<Board> {
    const board = await this.findOne(id)
    if (board.ownerId !== user.id) {
      throw new ForbiddenException('You do not have permission to update this board')
    }

    // Merge the updateData with the existing board
    Object.assign(board, updateData)

    // Save the updated board
    return this.boardsRepository.save(board)
  }
}
