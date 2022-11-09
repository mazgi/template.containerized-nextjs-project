import { StatusController } from './status.controller'
import { StatusService } from './status.service'
import { Module } from '@nestjs/common'

@Module({
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
