import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Ingredient } from '../ingredient/entity/ingredient.entity'
import { RecipeIngredient } from './entity/recipe-ingredient.entity'
import { Recipe } from './entity/recipe.entity'
import { RecipeController } from './recipe.controller'
import { RecipeService } from './recipe.service'

@Module({
  imports: [SequelizeModule.forFeature([Recipe, RecipeIngredient, Ingredient])],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
