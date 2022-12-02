import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Status {
  @Field({
    description: 'The service name of BFF',
  })
  name: string

  @Field({
    description: 'The state of BFF',
  })
  state: 'healthy' | 'unhealthy'

  @Field({
    description: 'The semantic version of BFF',
  })
  version: string
}
