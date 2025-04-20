import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DataSource } from 'typeorm'

import { GetRoutineByUsed } from '../../../exercises/dto/getRoutineByUsed'
import { RoutineDetailDto } from '../../../exercises/dto/getRoutineDetails'
import { CreateRoutineWithExercisesDto } from '../../../exercises/dto/routine.dto'
import { TodayRoutineDto } from '../../../exercises/dto/todayRoutine.dto'
import { RoutineExercise } from '../../../exercises/entities/routine-exercise.entity'
import { DayRoutine } from '../../entities/day-routine.entity'
import { Routine } from '../../entities/routine.entity'

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(Routine)
    private routinesRepository: Repository<Routine>,
    @InjectRepository(DayRoutine)
    private dayRoutineRepository: Repository<DayRoutine>,
    private dataSource: DataSource, // Para usar transacciones
    @InjectRepository(RoutineExercise)
    private routineExerciseRepository: Repository<RoutineExercise>,
  ) {}

  async findAllByUser(ownerId: number): Promise<Routine[]> {
    return await this.routinesRepository.find({ where: { ownerId } })
  }

  async createRoutineWithExercises(
    createRoutineDto: CreateRoutineWithExercisesDto,
    ownerId: number,
  ): Promise<Routine> {
    try {
      console.log('createRoutineDto:', createRoutineDto)
      return await this.dataSource.transaction(async (manager) => {
        // Crear la rutina
        const routine = manager.create(Routine, {
          name: createRoutineDto.name,
          description: createRoutineDto.description,
          ownerId,
          isPublic: false,
        })
        console.log('Routine:', routine)
        const savedRoutine = await manager.save(routine)

        // Crear los días asociados
        const dayRoutines = createRoutineDto.dayOfWeek.map((day) =>
          manager.create(DayRoutine, {
            routineId: savedRoutine.id,
            dayOfWeek: day,
            order: 1, // Ajusta el orden según lo necesario
            userId: ownerId,
          }),
        )
        await manager.save(dayRoutines)

        // Crear los ejercicios asociados
        const routineExercises = createRoutineDto.exercises.map((exerciseDto) =>
          manager.create(RoutineExercise, {
            routineId: savedRoutine.id,
            exerciseId: exerciseDto.id,
          }),
        )
        await manager.save(routineExercises)

        return savedRoutine
      })
    } catch (error) {
      throw new Error(`Error creating routine: ${error.message}`)
    }
  }

  async getAllRoutinesByUserId(ownerId: number): Promise<GetRoutineByUsed[]> {
    const routines = await this.routinesRepository
      .createQueryBuilder('routine')
      .leftJoin('routine.routineExercises', 'routineExercises')
      .leftJoin('routine.dayRoutines', 'dayRoutines')
      .select([
        'routine.id',
        'routine.name',
        'routine.description',
        'routine.createdAt',
        'dayRoutines.dayOfWeek',
      ])
      .addSelect('COUNT(DISTINCT routineExercises.id)', 'totalExercises')
      .where('routine.ownerId = :ownerId', { ownerId })
      .groupBy('routine.id')
      .addGroupBy('routine.name')
      .addGroupBy('routine.description')
      .addGroupBy('routine.createdAt')
      .addGroupBy('dayRoutines.dayOfWeek')
      .orderBy('routine.createdAt', 'DESC')
      .getRawMany()

    // Agrupamos los resultados por rutina
    const routineMap = new Map()

    routines.forEach((routine) => {
      const routineId = routine.routine_id
      if (!routineMap.has(routineId)) {
        routineMap.set(routineId, {
          id: routineId,
          name: routine.routine_name,
          description: routine.routine_description,
          totalExercises: parseInt(routine.totalExercises),
          createdAt: routine.routine_createdAt,
          trainingDays: [],
        })
      }

      if (routine.dayRoutines_dayOfWeek !== null) {
        const currentRoutine = routineMap.get(routineId)
        if (!currentRoutine.trainingDays.includes(routine.dayRoutines_dayOfWeek)) {
          currentRoutine.trainingDays.push(routine.dayRoutines_dayOfWeek)
        }
      }
    })

    return Array.from(routineMap.values())
  }

  async getRoutineDetail(userId: number, routineId: number): Promise<RoutineDetailDto> {
    const routine = await this.routinesRepository.findOne({
      where: { id: routineId, ownerId: userId },
      relations: [
        'routineExercises',
        'dayRoutines',
        'routineExercises.exercise',
        'routineExercises.exercise.muscleGroup',
      ],
    })

    return {
      id: routine.id,
      name: routine.name,
      description: routine.description,
      routineExercises: routine.routineExercises.map((re) => ({
        id: re.id,
        exercise: {
          id: re.exercise.id,
          name: re.exercise.name,
          description: re.exercise.description,
          muscleGroup: re.exercise.muscleGroup.name,
        },
      })),
      dayRoutines: routine.dayRoutines.map((dr) => ({
        id: dr.id,
        dayOfWeek: dr.dayOfWeek,
        order: dr.order,
      })),
    }
  }

  // eliminar ejercicio de rutina
  async deleteExerciseFromRoutine(
    routineId: number,
    exerciseId: number,
    userId: number,
  ): Promise<void> {
    const routine = await this.routinesRepository.findOne({
      where: { id: routineId, ownerId: userId },
    })

    if (!routine) {
      throw new Error('Routine not found')
    }

    await this.routineExerciseRepository.delete({ routineId, exerciseId })
  }
  // añadir ejercicio a rutina
  async addExerciseToRoutine(userId, routineId: number, exerciseId: number): Promise<void> {
    const routine = await this.routinesRepository.findOne({
      where: { id: routineId, ownerId: userId },
    })

    if (!routine) {
      throw new Error('Routine not found')
    }

    const routineExercise = this.routineExerciseRepository.create({
      routineId,
      exerciseId,
    })

    await this.routineExerciseRepository.save(routineExercise)
  }

  async getTodayRoutines(userId: number): Promise<TodayRoutineDto[]> {
    const today = new Date().getDay()
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString().split('T')[0] // Get YYYY-MM-DD format

    const routines = await this.routinesRepository
      .createQueryBuilder('routine')
      .leftJoinAndSelect('routine.dayRoutines', 'dayRoutine')
      .leftJoinAndSelect('routine.routineExercises', 'routineExercise')
      .leftJoinAndSelect('routineExercise.exercise', 'exercise')
      .leftJoinAndSelect('exercise.muscleGroup', 'muscleGroup')
      .leftJoinAndSelect(
        'exercise.exerciseProgressLogs',
        'exerciseProgressLog',
        'exerciseProgressLog.userId = :userId AND DATE(exerciseProgressLog.createdAt) = :currentDate',
        { userId, currentDate: formattedDate },
      )
      .where('routine.ownerId = :userId', { userId })
      .andWhere('dayRoutine.dayOfWeek = :today', { today })
      .orderBy('routine.name', 'ASC')
      .addOrderBy('exercise.name', 'ASC')
      .getMany()

    // Add null check before mapping
    return routines.map((routine) => ({
      id: routine.id,
      name: routine.name,
      description: routine.description,
      exercises:
        routine.routineExercises?.map((re) => ({
          id: re.exercise.id,
          name: re.exercise.name,
          description: re.exercise.description,
          muscleGroup: re.exercise.muscleGroup.name,
          // Usar los logs asociados al ejercicio directamente
          progressLogs: re.exercise.exerciseProgressLogs
            ? re.exercise.exerciseProgressLogs.map((log) => ({
                id: log.id,
                reps: log.reps,
                weight: log.weight,
                isNewRecord: log.isNewRecord,
                createdAt: log.createdAt,
              }))
            : [],
        })) || [], // Provide empty array as fallback
    }))
  }
}
