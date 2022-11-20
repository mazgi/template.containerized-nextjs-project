import { ApiProperty } from '@nestjs/swagger'

export class Status {
  @ApiProperty({
    example: 'bff',
    description: 'The service name of BFF',
  })
  name: string

  @ApiProperty({
    example: 'healthy',
    description: 'The state of BFF',
  })
  state: 'healthy' | 'unhealthy'

  @ApiProperty({
    example: '1.2.3',
    description: 'The semantic version of BFF',
  })
  version: string
}
