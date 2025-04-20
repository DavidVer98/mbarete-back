import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Exercise } from '../../entities/exercise.entity'
import { MuscleGroup } from '../../entities/muscle-group.entity'

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exercisesRepository: Repository<Exercise>,
    @InjectRepository(MuscleGroup)
    private muscleGroupRepository: Repository<MuscleGroup>,
  ) {}
  async findAll(muscleGroup?: string, search?: string): Promise<Exercise[]> {
    const queryBuilder = this.exercisesRepository
      .createQueryBuilder('exercise')
      .leftJoinAndSelect('exercise.muscleGroup', 'muscleGroup')

    if (muscleGroup && muscleGroup.toLowerCase() !== 'todos') {
      queryBuilder.andWhere('LOWER(muscleGroup.name) = LOWER(:muscleGroup)', { muscleGroup })
    }

    if (search) {
      queryBuilder.andWhere('LOWER(exercise.name) LIKE LOWER(:search)', { search: `%${search}%` })
    }

    return await queryBuilder.getMany()
  }
  async findByName(name: string): Promise<Exercise> {
    return await this.exercisesRepository.findOne({ where: { name } })
  }

  async create(exercise: Exercise): Promise<Exercise> {
    return await this.exercisesRepository.save(exercise)
  }

  async update(exercise: Exercise): Promise<Exercise> {
    return await this.exercisesRepository.save(exercise)
  }

  async delete(id: string): Promise<void> {
    await this.exercisesRepository.delete(id)
  }

  async findByMuscleGroup(name: string): Promise<Exercise[]> {
    const muscleGroup = await this.muscleGroupRepository.findOne({ where: { name } })
    return await this.exercisesRepository.find({ where: { muscleGroup } })
  }
}
