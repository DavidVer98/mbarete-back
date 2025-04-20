import { Controller, Get, Query } from '@nestjs/common'

import { Exercise } from '../../entities/exercise.entity'
import { ExercisesService } from '../../services/exercises/exercises.service'

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  async getAllExercises(
    @Query('muscleGroup') muscleGroup?: string,
    @Query('search') search?: string,
  ): Promise<Exercise[]> {
    return await this.exercisesService.findAll(muscleGroup, search)
  }

  // get by muscle group
  @Get('muscle-group')
  async getExercisesByMuscleGroup(@Query('name') name: string): Promise<Exercise[]> {
    return await this.exercisesService.findByMuscleGroup(name)
  }
}
