import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { databaseModule } from './db/database.module'
import { IngredientModule } from './ingredient/ingredient.module'
import { RecipeModule } from './recipe/recipe.module'
import { StockModule } from './stock/stock.module'

@Module({
  imports: [databaseModule, IngredientModule, RecipeModule, StockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
