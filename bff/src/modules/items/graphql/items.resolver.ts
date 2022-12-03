import { ItemsService } from '../items.service'
import { Resolver } from '@nestjs/graphql'

@Resolver()
export class ItemsResolver {
  constructor(private readonly service: ItemsService) {}
}
