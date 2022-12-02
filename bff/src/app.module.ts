import { StatusModule as GraphQLStatusModule } from './graphql/status.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { StatusModule as RESTStatusModule } from '~/src/rest/status/status.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    RESTStatusModule,
    GraphQLStatusModule,
    // https://docs.nestjs.com/recipes/router-module
    RouterModule.register([
      {
        path: 'rest',
        children: [RESTStatusModule],
      },
    ]),
  ],
})
export class AppModule {}
