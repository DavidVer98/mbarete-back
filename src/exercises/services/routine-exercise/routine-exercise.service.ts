import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { RoutineExercise } from '../../entities/routine-exercise.entity'

@Injectable()
export class RoutineExerciseService {
  constructor(
    @InjectRepository(RoutineExercise)
    private readonly routineExerciseRepository: Repository<RoutineExercise>,
  ) {}

  async findAll(): Promise<RoutineExercise[]> {
    return this.routineExerciseRepository.find()
  }

  // async findOne(id: number): Promise<RoutineExercise> {
  //   return this.routineExerciseRepository.findOne(id)
  // }

  async create(routineExercise: RoutineExercise): Promise<RoutineExercise> {
    return this.routineExerciseRepository.save(routineExercise)
  }

  // async update(id: number, routineExercise: RoutineExercise): Promise<RoutineExercise> {
  //   await this.routineExerciseRepository.update(id, routineExercise)
  //   return this.routineExerciseRepository.findOne(id)
  // }

  async remove(id: number): Promise<void> {
    await this.routineExerciseRepository.delete(id)
  }
}
