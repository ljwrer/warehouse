import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Channel } from './entity/channel.entity'
import { Ingredient } from './entity/ingredient.entity'
import { IngredientController } from './ingredient.controller'
import { IngredientService } from './ingredient.service'

@Module({
  imports: [SequelizeModule.forFeature([Ingredient, Channel])],
  controllers: [IngredientController],
  providers: [IngredientService],
  exports: [SequelizeModule],
})
export class IngredientModule {}
