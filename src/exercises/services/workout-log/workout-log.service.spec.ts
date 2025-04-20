import { Test, TestingModule } from '@nestjs/testing'

import { ScheduledExerciseService } from './workout-log.service'

describe('ScheduledExerciseService', () => {
  let service: ScheduledExerciseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduledExerciseService],
    }).compile()

    service = module.get<ScheduledExerciseService>(ScheduledExerciseService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
