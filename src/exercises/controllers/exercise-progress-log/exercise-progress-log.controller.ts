import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../../../auth/jwt-auth.guard'
import { User } from '../../../common/decorators/user.decorator'
import { CreateExerciseProgressLogDto } from '../../dto/createExerciseProgressLog'
import { ExerciseHistoryResponseDto } from '../../dto/exercise-history.dto'
import { MonthlyStatsDto } from '../../dto/monthly-stats.dto'
import { ExerciseProgressLogService } from '../../services/exercise-progress-log/exercise-progress-log.service'

@Controller('exercise-progress-log')
@UseGuards(JwtAuthGuard)
export class ExerciseProgressLogController {
  constructor(private readonly exerciseProgressLogService: ExerciseProgressLogService) {}

  @Post('/create')
  create(@User() user, @Body() createExerciseProgressLogDto: CreateExerciseProgressLogDto) {
    return this.exerciseProgressLogService.createExerciseProgressLog(
      user.id,
      createExerciseProgressLogDto,
    )
  }

  @Get(':exerciseId')
  findAll(@User() user, @Param('exerciseId') exerciseId: number) {
    return this.exerciseProgressLogService.getExerciseProgressLogs(exerciseId, user.id)
  }

  @Get(':exerciseId/history')
  getExerciseHistory(
    @Param('exerciseId') exerciseId: number,
    @User() user,
  ): Promise<ExerciseHistoryResponseDto> {
    return this.exerciseProgressLogService.getExerciseHistory(exerciseId, user.id)
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateExerciseProgressLogDto: CreateExerciseProgressLogDto,
    @User() user,
  ) {
    return this.exerciseProgressLogService.editExerciseProgressLog(
      updateExerciseProgressLogDto,
      id,
      user.id,
    )
  }

  @Delete(':id')
  remove(@Param('id') id: number, @User() user) {
    return this.exerciseProgressLogService.deleteExerciseProgressLog(id, user.id)
  }

  @Get('stats/monthly')
  async getMonthlyStats(@User() user): Promise<MonthlyStatsDto> {
    const currentDate = new Date()
    return this.exerciseProgressLogService.getMonthlyStats(user.id, currentDate)
  }
}
