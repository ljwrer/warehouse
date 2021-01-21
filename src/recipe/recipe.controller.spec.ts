import { SequelizeModule } from '@nestjs/sequelize'
import { Test } from '@nestjs/testing'
import { databaseModule } from '../db/database.module'
import { Channel } from '../ingredient/entity/channel.entity'
import { Ingredient } from '../ingredient/entity/ingredient.entity'
import { copy, log, logJSONStr } from '../util/test/test'
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

  describe('find all', () => {
    it('should return all recipe', async () => {
      const result = await recipeController.findAll()
      log(result)
    })
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

  describe('update', () => {
    it('update first recipe amount', async () => {
      const allRecipes = await recipeController.findAll()
      const firstRecipe = copy(allRecipes[0])
      firstRecipe.ingredients.forEach((ingredient) => {
        ingredient.amount++
      })
      const result = await recipeController.update(firstRecipe)
      log(result)
    })
  })
})
