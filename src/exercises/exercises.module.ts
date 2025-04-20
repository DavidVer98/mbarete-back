import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ExerciseController } from './controllers/exercise/exercise.controller'
import { ExerciseProgressLogController } from './controllers/exercise-progress-log/exercise-progress-log.controller'
import { RoutineExerciseController } from './controllers/routine-exercise/routine-exercise.controller'
import { RoutinesController } from './controllers/routines/routines.controller'
import { ScheduledExerciseController } from './controllers/scheduled-exercise/scheduled-exercise.controller'
import { SheduledSessionsController } from './controllers/sheduled-sessions/sheduled-sessions.controller'
import { WorkoutLogsController } from './controllers/workout-logs/workout-logs.controller'
import { WorkoutSetLogsController } from './controllers/workout-set-logs/workout-set-logs.controller'
import { DayRoutine } from './entities/day-routine.entity'
import { ExerciseProgressLog } from './entities/exercise-progress-log.entity'
import { Exercise } from './entities/exercise.entity'
import { MuscleGroup } from './entities/muscle-group.entity'
import { RoutineExercise } from './entities/routine-exercise.entity'
import { Routine } from './entities/routine.entity'
import { WorkoutLog } from './entities/workout-log.entity'
import { ExerciseProgressLogService } from './services/exercise-progress-log/exercise-progress-log.service'
import { ExercisesService } from './services/exercises/exercises.service'
import { RoutineExerciseService } from './services/routine-exercise/routine-exercise.service'
import { RoutinesService } from './services/routines/routines.service'
import { ScheduledExerciseService } from './services/workout-log/workout-log.service'
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExerciseProgressLog,
      Exercise,
      MuscleGroup,
      RoutineExercise,
      Routine,
      WorkoutLog,
      DayRoutine,
    ]),
  ],
  controllers: [
    ExerciseController,
    RoutinesController,
    WorkoutLogsController,
    RoutineExerciseController,
    SheduledSessionsController,
    WorkoutSetLogsController,
    ExerciseProgressLogController,
    ScheduledExerciseController,
  ],
  providers: [
    ExercisesService,
    RoutinesService,
    RoutineExerciseService,
    ExerciseProgressLogService,
    ScheduledExerciseService,
  ],
  exports: [ExercisesService],
})
export class ExercisesModule {}
