import { Controller, Get } from '@nestjs/common'
import { Status, StatusService } from './status.service'

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  getStatus(): Status {
    return this.statusService.getStatus()
  }
}
