// src/folders/folders.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateFolderDto } from './dto/create-folder.dto'
import { UpdateFolderDto } from './dto/update-folder.dto'
import { Folder } from './folder.entity'

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private readonly foldersRepository: Repository<Folder>,
  ) {}

  async create(createFolderDto: CreateFolderDto & { ownerId: number }) {
    const folder = this.foldersRepository.create(createFolderDto)
    return await this.foldersRepository.save(folder)
  }

  async findAll(userId: number) {
    return await this.foldersRepository.find({
      where: {
        ownerId: userId,
        parentFolderId: null, // Solo folders raíz
      },
      relations: ['subfolders', 'boards'],
    })
  }

  async findOne(id: number) {
    const folder = await this.foldersRepository.findOne({
      where: { id },
      relations: ['subfolders', 'boards'],
    })

    if (!folder) {
      throw new NotFoundException(`Folder with ID ${id} not found`)
    }

    return folder
  }

  async update(id: number, updateFolderDto: UpdateFolderDto) {
    const folder = await this.findOne(id)
    await this.foldersRepository.update(id, updateFolderDto)
    return this.findOne(id)
  }

  async remove(id: number) {
    const folder = await this.findOne(id)
    return await this.foldersRepository.remove(folder)
  }
}
