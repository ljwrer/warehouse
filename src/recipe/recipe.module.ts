import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChannelEntity } from '../ingredients/entity/channel.entity'
import { IngredientsEntity } from '../ingredients/entity/ingredients.entity'
import { RecipeIngredientsEntity } from './entity/recipe-ingredients.entity'
import { RecipeEntity } from './entity/recipe.entity'
import { RecipeController } from './recipe.controller'
import { RecipeService } from './recipe.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecipeEntity,
      RecipeIngredientsEntity,
      IngredientsEntity,
      ChannelEntity,
    ]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
