import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { StatusModule as RESTStatusModule } from '~/src/rest/status/status.module'

@Module({
  imports: [
    RESTStatusModule,
    // https://docs.nestjs.com/recipes/router-module
    RouterModule.register([
      {
        path: 'rest',
        children: [RESTStatusModule],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
