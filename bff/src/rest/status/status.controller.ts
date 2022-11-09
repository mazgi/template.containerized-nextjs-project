import { StatusService } from './status.service'
import { Controller, Get } from '@nestjs/common'

@Controller('status')
export class StatusController {
  constructor(private readonly service: StatusService) {}

  @Get()
  read() {
    return this.service.read()
  }
}
