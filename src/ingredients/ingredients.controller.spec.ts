import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmModule } from '../config/typeorm'
import { IngredientsDto } from './dto/ingredients.dto'
import { ChannelEntity } from './entity/channel.entity'
import { IngredientsEntity } from './entity/ingredients.entity'
import { Unit } from './enum/ingredients.enum'
import { IngredientsController } from './ingredients.controller'
import { IngredientsService } from './ingredients.service'

describe('AppController', () => {
  let ingredientsController: IngredientsController

  beforeAll(async () => {
    const ingredientsModuleRef = await Test.createTestingModule({
      controllers: [IngredientsController],
      providers: [IngredientsService],
      imports: [
        typeOrmModule,
        TypeOrmModule.forFeature([IngredientsEntity, ChannelEntity]),
      ],
    }).compile()
    ingredientsController = ingredientsModuleRef.get<IngredientsController>(
      IngredientsController,
    )
  })

  describe('create', () => {
    it('create 3 ingredients', async () => {
      await ingredientsController.create({
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
      await ingredientsController.create({
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
      await ingredientsController.create({
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
      const allIngredients = await ingredientsController.findAll()
      const ingredients = (allIngredients[0] as any) as IngredientsDto
      ingredients.period = ingredients.period + 1
      const channel = ingredients.channels[0]
      channel.price = channel.price + 1
      console.log(ingredients)
      const result = await ingredientsController.update(ingredients as any)
      console.log(result)
    })
  })
})
