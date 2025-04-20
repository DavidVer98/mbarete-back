import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, Repository } from 'typeorm'

import { CreateExerciseProgressLogDto } from '../../dto/createExerciseProgressLog'
import { ExerciseHistoryResponseDto, ExerciseSetDto } from '../../dto/exercise-history.dto'
import { GetExerciseProgressLogDto } from '../../dto/getExerciseProgressLog'
import { MonthlyStatsDto } from '../../dto/monthly-stats.dto'
import { ExerciseProgressLog } from '../../entities/exercise-progress-log.entity'

@Injectable()
export class ExerciseProgressLogService {
  constructor(
    @InjectRepository(ExerciseProgressLog)
    private exerciseProgressLogRepository: Repository<ExerciseProgressLog>,
  ) {}

  async createExerciseProgressLog(
    userId: number,
    createExerciseProgressLogDto: CreateExerciseProgressLogDto,
  ): Promise<ExerciseProgressLog> {
    try {
      const isPR = await this.isMaxWeightAndReps(
        createExerciseProgressLogDto.exerciseId,
        createExerciseProgressLogDto.weight,
        createExerciseProgressLogDto.reps,
        userId,
      )

      const exerciseProgressLog = this.exerciseProgressLogRepository.create({
        ...createExerciseProgressLogDto,
        isNewRecord: isPR,
        userId,
      })

      return await this.exerciseProgressLogRepository.save(exerciseProgressLog)
    } catch (error) {
      throw error
    }
  }

  async isMaxWeightAndReps(
    exerciseId: number,
    weight: number,
    reps: number,
    userId: number,
  ): Promise<boolean> {
    // Buscar el registro con el mayor peso para este ejercicio y usuario
    const maxWeightLog = await this.exerciseProgressLogRepository.findOne({
      where: { exerciseId, userId },
      order: { weight: 'DESC' },
    })

    // Si no hay registros previos, es un PR automáticamente
    if (!maxWeightLog) {
      return true
    }

    // Si el nuevo peso es mayor, es un PR independientemente de las repeticiones
    if (weight > maxWeightLog.weight) {
      return true
    }

    // Si el peso es igual al máximo, buscar si hay más repeticiones con ese peso
    if (weight === maxWeightLog.weight) {
      const maxRepsAtWeight = await this.exerciseProgressLogRepository.findOne({
        where: { exerciseId, userId, weight },
        order: { reps: 'DESC' },
      })

      // Es PR si las nuevas repeticiones son mayores
      return reps > maxRepsAtWeight.reps
    }

    return false
  }

  // get all logs for an exercise and user
  async getExerciseProgressLogs(
    exerciseId: number,
    userId: number,
  ): Promise<GetExerciseProgressLogDto[]> {
    const startOfDay = new Date()
    startOfDay.setUTCHours(0, 0, 0, 0)

    const endOfDay = new Date()
    endOfDay.setUTCHours(23, 59, 59, 999)

    return await this.exerciseProgressLogRepository.find({
      where: {
        exerciseId,
        userId,
        createdAt: Between(startOfDay, endOfDay),
      },
      order: { createdAt: 'DESC' },
    })
  }

  async getExerciseHistory(
    exerciseId: number,
    userId: number,
  ): Promise<ExerciseHistoryResponseDto> {
    // Get all logs for this exercise and user
    const logs = await this.exerciseProgressLogRepository.find({
      where: { exerciseId, userId },
      order: { createdAt: 'DESC' },
    })

    // Group logs by date
    const logsByDate = logs.reduce(
      (acc, log) => {
        // Format date as YYYY-MM-DD
        const date = log.createdAt.toISOString().split('T')[0]

        if (!acc[date]) {
          acc[date] = []
        }

        // Add this set to the date's sets array
        acc[date].push({
          reps: log.reps.toString(),
          weight: log.weight.toString(),
          isNewRecord: log.isNewRecord,
        })

        return acc
      },
      {} as Record<string, ExerciseSetDto[]>,
    )

    // Convert to the required array format
    return Object.keys(logsByDate).map((date) => ({
      date,
      sets: logsByDate[date],
    }))
  }

  async editExerciseProgressLog(
    editExerciseProgressLogDto: CreateExerciseProgressLogDto,
    exerciseProgressLogId: number,
    userId: number,
  ): Promise<ExerciseProgressLog> {
    const exerciseProgressLog = await this.exerciseProgressLogRepository.findOne({
      where: { id: exerciseProgressLogId, userId },
      order: { createdAt: 'DESC' },
    })
    if (!exerciseProgressLog) {
      throw new Error('No exercise progress log found')
    }
    try {
      return await this.exerciseProgressLogRepository.save({
        ...exerciseProgressLog,
        ...editExerciseProgressLogDto,
      })
    } catch (error) {
      throw error
    }
  }

  // delete
  async deleteExerciseProgressLog(exerciseProgressLogId: number, userId: number): Promise<void> {
    const deleteExerciseProgressLog = await this.exerciseProgressLogRepository.delete({
      id: exerciseProgressLogId,
      userId,
    })
    if (!deleteExerciseProgressLog.affected) {
      throw new Error('No exercise progress log found')
    } else {
      return
    }
  }

  async getMonthlyStats(userId: number, date?: Date): Promise<MonthlyStatsDto> {
    // If no date provided, use current month
    const targetDate = date || new Date()

    // Calculate first and last day of month
    const firstDayOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1)
    const lastDayOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0)
    lastDayOfMonth.setHours(23, 59, 59, 999)

    // Get all logs for the month
    const logs = await this.exerciseProgressLogRepository.find({
      where: {
        userId,
        createdAt: Between(firstDayOfMonth, lastDayOfMonth),
      },
      relations: ['exercise'], // Add relation to the exercise entity
    })

    // Return empty stats if no logs found
    if (logs.length === 0) {
      return {
        totalWorkouts: 0,
        totalExercises: 0,
        totalWeight: 0,
        totalReps: 0,
        personalRecords: 0,
      }
    }

    // Calculate basic stats
    let totalWeight = 0
    let totalReps = 0
    let personalRecords = 0

    // For unique workout days
    const uniqueDates = new Set<string>()

    // For most frequent exercise
    const exerciseCounts: Record<number, { count: number; name: string }> = {}

    // For tracking max weight and reps
    let maxWeightExercise = {
      exerciseId: 0,
      weight: 0,
      name: '',
      date: '',
      reps: 0,
    }

    let maxRepsExercise = {
      exerciseId: 0,
      reps: 0,
      name: '',
      date: '',
      weight: 0,
    }

    // For best day calculation
    const weightByDate: Record<string, number> = {}

    logs.forEach((log) => {
      // Calculate total weight (weight × reps)
      const logTotalWeight = log.weight * log.reps
      totalWeight += logTotalWeight

      // Sum repetitions
      totalReps += log.reps

      // Count PRs
      if (log.isNewRecord) {
        personalRecords++
      }

      // Add unique date
      const dateString = log.createdAt.toISOString().split('T')[0]
      uniqueDates.add(dateString)

      // Count exercises and store name
      if (!exerciseCounts[log.exerciseId]) {
        exerciseCounts[log.exerciseId] = {
          count: 0,
          name: log.exercise ? log.exercise.name : 'Unknown Exercise',
        }
      }
      exerciseCounts[log.exerciseId].count++

      // Sum weight by day
      if (!weightByDate[dateString]) {
        weightByDate[dateString] = 0
      }
      weightByDate[dateString] += logTotalWeight

      // Track max weight exercise
      if (log.weight > maxWeightExercise.weight) {
        maxWeightExercise = {
          exerciseId: log.exerciseId,
          weight: log.weight,
          name: log.exercise ? log.exercise.name : 'Unknown Exercise',
          date: dateString,
          reps: log.reps,
        }
      }

      // Track max reps exercise
      if (log.reps > maxRepsExercise.reps) {
        maxRepsExercise = {
          exerciseId: log.exerciseId,
          reps: log.reps,
          name: log.exercise ? log.exercise.name : 'Unknown Exercise',
          date: dateString,
          weight: log.weight,
        }
      }
    })

    // Find most frequent exercise
    let mostFrequentExerciseId = 0
    let maxCount = 0
    let exerciseName = ''

    Object.entries(exerciseCounts).forEach(([exerciseId, data]) => {
      if (data.count > maxCount) {
        maxCount = data.count
        mostFrequentExerciseId = parseInt(exerciseId)
        exerciseName = data.name
      }
    })

    // Find the best day
    const bestDay = {
      date: '',
      totalWeight: 0,
    }

    Object.entries(weightByDate).forEach(([date, weight]) => {
      if (weight > bestDay.totalWeight) {
        bestDay.date = date
        bestDay.totalWeight = weight
      }
    })

    return {
      totalWorkouts: uniqueDates.size,
      totalExercises: logs.length,
      totalWeight,
      totalReps,
      personalRecords,
      mostFrequentExercise: mostFrequentExerciseId
        ? {
            exerciseId: mostFrequentExerciseId,
            name: exerciseName,
            count: maxCount,
          }
        : undefined,
      bestDay: bestDay.date ? bestDay : undefined,
      maxWeightExercise: maxWeightExercise.exerciseId ? maxWeightExercise : undefined,
      maxRepsExercise: maxRepsExercise.exerciseId ? maxRepsExercise : undefined,
    }
  }
}
