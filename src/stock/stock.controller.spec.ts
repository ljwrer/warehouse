import { SequelizeModule } from '@nestjs/sequelize'
import { Test } from '@nestjs/testing'
import { databaseModule } from '../db/database.module'
import { Channel } from '../ingredient/entity/channel.entity'
import { Ingredient } from '../ingredient/entity/ingredient.entity'
import { copy, log } from '../util/test/test'
import { Stock } from './entity/stock.eneity'
import { StockController } from './stock.controller'
import { StockService } from './stock.service'

describe('StockController', () => {
  let stockController: StockController

  beforeAll(async () => {
    const stockModuleRef = await Test.createTestingModule({
      controllers: [StockController],
      providers: [StockService],
      imports: [
        databaseModule,
        SequelizeModule.forFeature([Stock, Ingredient, Channel]),
      ],
    }).compile()

    stockController = stockModuleRef.get<StockController>(StockController)
  })

  describe('find all', () => {
    it('should return all recipe', async () => {
      const result = await stockController.findAll()
      log(result)
    })
  })

  describe('create', () => {
    beforeAll(async () => {
      await Stock.truncate()
    })

    it('create 1 stock', async () => {
      const { id: ingredientId } = await Ingredient.findOne()
      const result = await stockController.create({
        ingredientId,
        amount: 100,
      })
      log(result)
    })
  })

  describe('update', () => {
    it('create 1 stock', async () => {
      const stock = await Stock.findOne()
      const stockDto = copy(stock)
      stockDto.amount += 100
      const result = await stockController.update(stockDto)
      log(result)
    })
  })
})
