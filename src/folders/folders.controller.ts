// src/folders/folders.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common'

import { CreateFolderDto } from './dto/create-folder.dto'
import { UpdateFolderDto } from './dto/update-folder.dto'
import { FoldersService } from './folders.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

// src/folders/folders.controller.ts
@Controller('folders')
@UseGuards(JwtAuthGuard)
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post('create') // Cambia a /folders/create
  create(@Request() req, @Body() createFolderDto: CreateFolderDto) {
    return this.foldersService.create({
      ...createFolderDto,
      ownerId: req.user.id,
    })
  }

  @Get('list')
  findAll(@Request() req) {
    return this.foldersService.findAll(req.user.id)
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.foldersService.findOne(+id)
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto) {
    return this.foldersService.update(+id, updateFolderDto)
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.foldersService.remove(+id)
  }
}
