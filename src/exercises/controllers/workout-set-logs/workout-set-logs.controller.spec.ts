import { Test, TestingModule } from '@nestjs/testing'

import { WorkoutSetLogsController } from './workout-set-logs.controller'

describe('WorkoutSetLogsController', () => {
  let controller: WorkoutSetLogsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutSetLogsController],
    }).compile()

    controller = module.get<WorkoutSetLogsController>(WorkoutSetLogsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
