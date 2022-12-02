import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

const SemVerRegex =
  /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/

export enum State {
  healthy = 'healthy',
  unhealthy = 'unhealthy',
}
registerEnumType(State, { name: 'State' })

@ObjectType()
export class Status {
  @ApiProperty({
    example: 'bff',
    description: 'The service name of BFF',
  })
  @Field({
    description: 'The service name of BFF',
  })
  name: string

  @ApiProperty({
    enum: State,
    example: 'healthy',
    description: 'The state of BFF',
  })
  @Field(() => State, {
    description: 'The state of BFF',
  })
  state: State | 'healthy'

  @ApiProperty({
    example: '1.2.3',
    description: 'The semantic version of BFF',
    pattern: SemVerRegex.source,
  })
  @Field({
    description: 'The semantic version of BFF',
  })
  version: string
}
