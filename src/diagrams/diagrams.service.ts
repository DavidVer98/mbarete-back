import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Diagram } from './diagram.entity'

@Injectable()
export class DiagramsService {
  constructor(
    @InjectRepository(Diagram)
    private diagramsRepository: Repository<Diagram>,
  ) {}

  async create(createDiagramDto: Partial<Diagram>): Promise<Diagram> {
    const diagram = this.diagramsRepository.create(createDiagramDto)
    return this.diagramsRepository.save(diagram)
  }

  async findAll(): Promise<Diagram[]> {
    return this.diagramsRepository.find()
  }

  async findOne(id: string): Promise<Diagram> {
    return this.diagramsRepository.findOne({ where: { id } })
  }

  async update(id: string, updateDiagramDto: Partial<Diagram>): Promise<Diagram> {
    await this.diagramsRepository.update(id, updateDiagramDto)
    return this.diagramsRepository.findOne({ where: { id } })
  }

  async remove(id: string): Promise<void> {
    await this.diagramsRepository.delete(id)
  }
}
