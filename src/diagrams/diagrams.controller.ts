import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'

import { Diagram } from './diagram.entity'
import { DiagramsService } from './diagrams.service'

@Controller('diagrams')
export class DiagramsController {
  constructor(private readonly diagramsService: DiagramsService) {}

  @Post()
  create(@Body() createDiagramDto: Partial<Diagram>) {
    console.log('Recibida solicitud para crear diagrama:', createDiagramDto)
    return this.diagramsService.create(createDiagramDto)
  }

  @Get()
  findAll() {
    return this.diagramsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diagramsService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDiagramDto: Partial<Diagram>) {
    return this.diagramsService.update(id, updateDiagramDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diagramsService.remove(id)
  }
}
