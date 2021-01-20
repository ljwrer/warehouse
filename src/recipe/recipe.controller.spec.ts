import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getRepository, Repository } from 'typeorm'
import { typeOrmModule } from '../config/typeorm'
import { IngredientsEntity } from '../ingredients/entity/ingredients.entity'
import { RecipeIngredientsEntity } from './entity/recipe-ingredients.entity'
import { RecipeEntity } from './entity/recipe.entity'
import { RecipeController } from './recipe.controller'
import { RecipeService } from './recipe.service'

describe('AppController', () => {
  let recipeController: RecipeController

  beforeAll(async () => {
    const recipeModuleRef = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [RecipeService],
      imports: [
        typeOrmModule,
        TypeOrmModule.forFeature([
          RecipeEntity,
          RecipeIngredientsEntity,
          IngredientsEntity,
        ]),
      ],
    }).compile()

    recipeController = recipeModuleRef.get<RecipeController>(RecipeController)
  })

  describe('create', () => {
    it('create 1 recipe', async () => {
      const ingredientsRepo: Repository<IngredientsEntity> = getRepository<IngredientsEntity>(
        IngredientsEntity,
      )
      const { id: beefId } = await ingredientsRepo.findOne({
        name: '牛肉',
      })
      const { id: parsleyId } = await ingredientsRepo.findOne({
        name: '香菜',
      })

      const result = await recipeController.create({
        ingredients: [
          {
            id: beefId,
            amount: 0.2,
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
      console.log(result)
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
