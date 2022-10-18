import { Test, TestingModule } from '@nestjs/testing'
import { StatusController } from './status.controller'
import { StatusService } from './status.service'

describe('StatusController', () => {
  let controller: StatusController
  beforeEach(async () => {
    const mod: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [StatusService],
    }).compile()
    controller = mod.get<StatusController>(StatusController)
  })

  describe('root', () => {
    it('should return the message.', () => {
      expect(controller.getStatus().message).toContain('ok')
    })
    it('should return version string.', () => {
      expect(controller.getStatus().version).toBe('0.1.2')
    })
  })
})
