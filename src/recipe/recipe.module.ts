import { Module } from '@nestjs/common'
import { IngredientsModule } from '../ingredients/ingredients.module'
import { RecipeController } from './recipe.controller'
import { RecipeService } from './recipe.service'

@Module({
  imports: [IngredientsModule],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
