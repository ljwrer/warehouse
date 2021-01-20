import { SequelizeModule } from '@nestjs/sequelize'
import { Test } from '@nestjs/testing'
import { databaseModule } from '../db/database.module'
import { copy, log, sleep } from '../util/test/test'
import { Channel } from './entity/channel.entity'
import { Ingredient } from './entity/ingredient.entity'
import { Unit } from './enum/ingredient.enum'
import { IngredientController } from './ingredient.controller'
import { IngredientService } from './ingredient.service'

describe('AppController', () => {
  let ingredientController: IngredientController

  beforeAll(async () => {
    const ingredientsModuleRef = await Test.createTestingModule({
      controllers: [IngredientController],
      providers: [IngredientService],
      imports: [
        databaseModule,
        SequelizeModule.forFeature([Ingredient, Channel]),
      ],
    }).compile()
    ingredientController = ingredientsModuleRef.get<IngredientController>(
      IngredientController,
    )
  })

  describe('search ingredients', () => {
    it('should return all ingredients', async () => {
      const result = await ingredientController.findAll()
      log(result)
    })
  })

  describe('create', () => {
    beforeAll(async () => {
      await Ingredient.truncate()
      await Channel.truncate()
    })
    it('create 1 ingredients', async () => {
      const result = await ingredientController.create({
        name: '香菜',
        period: 3,
        unit: Unit.kg,
        isSeasoning: false,
        channels: [
          {
            name: '小区门口菜店',
            price: 5,
          },
        ],
      })
      log(result)
    })

    it('create 3 ingredients', async () => {
      await sleep(1000)
      await ingredientController.create({
        name: '牛肉',
        period: 14,
        unit: Unit.kg,
        isSeasoning: false,
        channels: [
          {
            name: '人人乐超市',
            price: 100,
          },
          {
            name: '天猫',
            url: 'http://www.tmall.com/',
            price: 80,
          },
        ],
      })
      await ingredientController.create({
        name: '猪肉',
        period: 14,
        unit: Unit.kg,
        isSeasoning: false,
        channels: [
          {
            name: '步步高超市',
            price: 100,
          },
          {
            name: '淘宝',
            url: 'http://www.taobao.com/',
            price: 80,
          },
        ],
      })
      await ingredientController.create({
        name: '羊肉',
        period: 14,
        unit: Unit.kg,
        isSeasoning: false,
        channels: [
          {
            name: '沃尔玛超市',
            price: 100,
          },
          {
            name: '京东',
            url: 'http://www.jd.com/',
            price: 80,
          },
        ],
      })
    })
  })

  describe('update', () => {
    it('update first ingredients period', async () => {
      const allIngredients = await ingredientController.findAll()
      const ingredient = copy(allIngredients)[0]
      ingredient.period = ingredient.period + 1
      const channel = ingredient.channels[0]
      channel.price = channel.price + 1
      const result = await ingredientController.update(ingredient)
      log(result)
    })
  })
})
