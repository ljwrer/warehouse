import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { typeOrmModule } from './config/typeorm'
import { IngredientsModule } from './ingredients/ingredients.module'

@Module({
  imports: [typeOrmModule, IngredientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
