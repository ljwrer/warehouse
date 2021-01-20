import { SequelizeModule } from '@nestjs/sequelize'
import { Test } from '@nestjs/testing'
import { databaseModule } from '../db/database.module'
import { Channel } from '../ingredient/entity/channel.entity'
import { Ingredient } from '../ingredient/entity/ingredient.entity'
import { logJSONStr } from '../util/test/test'
import { RecipeIngredient } from './entity/recipe-ingredient.entity'
import { Recipe } from './entity/recipe.entity'
import { RecipeController } from './recipe.controller'
import { RecipeService } from './recipe.service'

describe('RecipeController', () => {
  let recipeController: RecipeController

  beforeAll(async () => {
    const recipeModuleRef = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [RecipeService],
      imports: [
        databaseModule,
        SequelizeModule.forFeature([
          Recipe,
          RecipeIngredient,
          Ingredient,
          Channel,
        ]),
      ],
    }).compile()

    recipeController = recipeModuleRef.get<RecipeController>(RecipeController)
  })

  describe('create', () => {
    beforeAll(async () => {
      await Recipe.truncate()
      await RecipeIngredient.truncate()
    })

    it('create 1 recipe', async () => {
      const { id: beefId } = await Ingredient.findOne({
        where: {
          name: '牛肉',
        },
      })
      const { id: parsleyId } = await Ingredient.findOne({
        where: {
          name: '香菜',
        },
      })
      const result = await recipeController.create({
        ingredients: [
          {
            id: beefId,
            amount: 200,
          },
          {
            id: parsleyId,
            amount: 100,
          },
        ],
        text: '首先。。。然后。。。最后。。。',
        url: 'http://www.bilibili.com/abc',
        name: '香菜牛肉',
      })
      logJSONStr(result)
    })
  })

  // describe('update', () => {
  //   it('update first ingredients period', async () => {
  //     const allIngredients = await ingredientsController.findAll()
  //     const ingredients = (allIngredients[0] as any) as IngredientDto
  //     ingredients.period = ingredients.period + 1
  //     const channel = ingredients.channels[0]
  //     channel.price = channel.price + 1
  //     console.log(ingredients)
  //     const result = await ingredientsController.update(ingredients as any)
  //     console.log(result)
  //   })
  // })
})
