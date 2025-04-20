import { Test, TestingModule } from '@nestjs/testing'

import { ScheduledExerciseController } from './scheduled-exercise.controller'

describe('ScheduledExerciseController', () => {
  let controller: ScheduledExerciseController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduledExerciseController],
    }).compile()

    controller = module.get<ScheduledExerciseController>(ScheduledExerciseController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
