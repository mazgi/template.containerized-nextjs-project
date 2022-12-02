import { Status } from './entities/status.entity'
import { Query, Resolver } from '@nestjs/graphql'
import { StatusService } from '~/src/rest/status/status.service'

@Resolver()
export class StatusResolver {
  constructor(private readonly service: StatusService) {}

  @Query(() => Status, { name: 'status' })
  read() {
    return this.service.read()
  }
}
