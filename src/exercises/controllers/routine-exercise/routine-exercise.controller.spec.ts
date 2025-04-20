import { Test, TestingModule } from '@nestjs/testing'

import { RoutineExerciseController } from '../../entities/routine-exercise.entity'

describe('RoutineExerciseController', () => {
  let controller: RoutineExerciseController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutineExerciseController],
    }).compile()

    controller = module.get<RoutineExerciseController>(RoutineExerciseController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
