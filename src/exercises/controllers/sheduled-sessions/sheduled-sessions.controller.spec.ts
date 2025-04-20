import { Test, TestingModule } from '@nestjs/testing'

import { SheduledSessionsController } from './sheduled-sessions.controller'

describe('SheduledSessionsController', () => {
  let controller: SheduledSessionsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SheduledSessionsController],
    }).compile()

    controller = module.get<SheduledSessionsController>(SheduledSessionsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
