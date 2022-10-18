import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { StatusModule } from './rest/status/status.module'

@Module({
  imports: [
    StatusModule,
    // https://docs.nestjs.com/recipes/router-module
    RouterModule.register([
      {
        path: 'rest',
        children: [StatusModule],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
