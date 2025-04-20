import { Test, TestingModule } from '@nestjs/testing'

import { ExerciseProgressLogService } from './exercise-progress-log.service'

describe('ExerciseProgressLogService', () => {
  let service: ExerciseProgressLogService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseProgressLogService],
    }).compile()

    service = module.get<ExerciseProgressLogService>(ExerciseProgressLogService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
