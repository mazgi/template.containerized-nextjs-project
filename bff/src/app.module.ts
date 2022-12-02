import { StatusModule } from './modules/status/status.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    StatusModule,
    // https://docs.nestjs.com/recipes/router-module
    RouterModule.register([
      {
        path: 'openapi',
        children: [StatusModule],
      },
    ]),
  ],
})
export class AppModule {}
