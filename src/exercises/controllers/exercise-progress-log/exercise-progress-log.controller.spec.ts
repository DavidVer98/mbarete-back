import { Test, TestingModule } from '@nestjs/testing'

import { ExerciseProgressLogController } from './exercise-progress-log.controller'

describe('ExerciseProgressLogController', () => {
  let controller: ExerciseProgressLogController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseProgressLogController],
    }).compile()

    controller = module.get<ExerciseProgressLogController>(ExerciseProgressLogController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
