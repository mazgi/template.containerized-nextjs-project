import { Status } from './entities/status.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class StatusService {
  private readonly status: Status = {
    name: process.env.npm_package_name || 'bff+undef',
    state: 'healthy',
    version: process.env.npm_package_version || '0.0.0+undef',
  }

  read(): Status {
    return this.status
  }
}
