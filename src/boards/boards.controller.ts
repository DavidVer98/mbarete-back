import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common'

import { BoardsService } from './boards.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { User } from '../common/decorators/user.decorator'
import { User as UserEntity } from '../users/users.entity'

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async findAll(@User() user: UserEntity) {
    return this.boardsService.findAllByUser(user.id)
  }

  @Post()
  async create(
    @Body() createBoardDto: { name: string; description: string; folderId: number },
    @User() user: UserEntity,
  ) {
    return this.boardsService.create(
      createBoardDto.name,
      createBoardDto.description,
      user,
      createBoardDto.folderId,
    )
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(+id)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: { name?: string; description?: string; elements?: string },
    @User() user: UserEntity,
  ) {
    const updatedBoard = await this.boardsService.update(+id, updateBoardDto, user)
    return updatedBoard
  }
}
