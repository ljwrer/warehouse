import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { databaseModule } from './db/database.module'
import { IngredientModule } from './ingredient/ingredient.module'

@Module({
  imports: [databaseModule, IngredientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
