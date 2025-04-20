import { Controller, Post, Get, UseGuards, Body, Param, Delete } from '@nestjs/common'

import { AuthUser } from '../../../auth/dto/auth-user.dto'
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard'
import { User } from '../../../common/decorators/user.decorator'
import { GetRoutineByUsed } from '../../../exercises/dto/getRoutineByUsed'
import { RoutineDetailDto } from '../../../exercises/dto/getRoutineDetails'
import { CreateRoutineWithExercisesDto } from '../../../exercises/dto/routine.dto'
import { Routine } from '../../../exercises/entities/routine.entity'
import { TodayRoutineDto } from '../../dto/todayRoutine.dto'
import { RoutinesService } from '../../services/routines/routines.service'

@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getRoutines(@User() user: AuthUser): Promise<Routine[]> {
    return await this.routinesService.findAllByUser(user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-with-exercises')
  async createWithExercises(
    @Body() createRoutineDto: CreateRoutineWithExercisesDto,
    @User() user: AuthUser,
  ): Promise<Routine> {
    const ownerId = user.id
    return this.routinesService.createRoutineWithExercises(createRoutineDto, ownerId)
  }

  //getAllRoutinesByUserId
  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getAllRoutinesByUserId(@User() user: AuthUser): Promise<GetRoutineByUsed[]> {
    return await this.routinesService.getAllRoutinesByUserId(user.id)
  }

  //getRoutineDetail
  @UseGuards(JwtAuthGuard)
  @Get('detail/:id')
  async getRoutineDetail(
    @User() user: AuthUser,
    @Param('id') id: number,
  ): Promise<RoutineDetailDto> {
    return await this.routinesService.getRoutineDetail(user.id, id)
  }

  //deleteExerciseFromRoutine
  @UseGuards(JwtAuthGuard)
  @Delete(':routineId/delete-exercise/:excerciseId')
  async deleteExerciseFromRoutine(
    @User() user: AuthUser,
    @Param('routineId') routineId: number,
    @Param('excerciseId') excerciseId: number,
  ): Promise<void> {
    return await this.routinesService.deleteExerciseFromRoutine(user.id, routineId, excerciseId)
  }

  //addExerciseToRoutine
  @UseGuards(JwtAuthGuard)
  @Post(':routineId/add-exercise/:excerciseId')
  async addExerciseToRoutine(
    @User() user: AuthUser,
    @Param('routineId') routineId: number,
    @Param('excerciseId') excerciseId: number,
  ): Promise<void> {
    return await this.routinesService.addExerciseToRoutine(user.id, routineId, excerciseId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('today-routines')
  async getTodayRoutines(@User() user: AuthUser): Promise<TodayRoutineDto[]> {
    return await this.routinesService.getTodayRoutines(user.id)
  }
}
