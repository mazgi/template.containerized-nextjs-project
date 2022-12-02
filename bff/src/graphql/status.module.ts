import { StatusService } from '../rest/status/status.service'
import { StatusResolver } from './status/status.resolver'
import { Module } from '@nestjs/common'

@Module({
  controllers: [],
  providers: [StatusResolver, StatusService],
})
export class StatusModule {}
