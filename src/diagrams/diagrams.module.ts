import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Diagram } from './diagram.entity'
import { DiagramsController } from './diagrams.controller'
import { DiagramsService } from './diagrams.service'

@Module({
  imports: [TypeOrmModule.forFeature([Diagram])],
  controllers: [DiagramsController],
  providers: [DiagramsService],
})
export class DiagramsModule {}
