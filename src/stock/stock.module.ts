import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Channel } from '../ingredient/entity/channel.entity'
import { Ingredient } from '../ingredient/entity/ingredient.entity'
import { Stock } from './entity/stock.eneity'
import { StockController } from './stock.controller'
import { StockService } from './stock.service'

@Module({
  imports: [SequelizeModule.forFeature([Stock, Ingredient, Channel])],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
