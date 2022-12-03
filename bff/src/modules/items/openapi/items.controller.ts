import { ItemsService } from '../items.service'
import { Controller } from '@nestjs/common'

@Controller('items')
export class ItemsController {
  constructor(private readonly service: ItemsService) {}
}
