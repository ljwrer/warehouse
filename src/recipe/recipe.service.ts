import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { FindOptions, Op } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { Ingredient } from '../ingredient/entity/ingredient.entity'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { RecipeIngredientDto } from './dto/recipe-ingredient.dto'
import { RecipeIngredient } from './entity/recipe-ingredient.entity'
import { Recipe } from './entity/recipe.entity'

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe)
    private recipeModel: typeof Recipe,
    @InjectModel(RecipeIngredient)
    private recipeIngredientModel: typeof RecipeIngredient,
    @InjectModel(Ingredient)
    private ingredientModel: typeof Ingredient,
  ) {}

  static option: FindOptions = {
    include: [
      {
        model: Ingredient,
        attributes: [
          'id',
          'name',
          'unit',
          [
            Sequelize.literal('`ingredients->RecipeIngredient`.`amount`'),
            'amount',
          ],
        ],
        through: {
          attributes: [],
        },
      },
    ],
  }

  async getAll() {
    return this.recipeModel.findAll(RecipeService.option)
  }

  async insert(createRecipeDto: CreateRecipeDto) {
    const { id } = await this.recipeModel.create(createRecipeDto)
    await this.upsertIngredient(id, createRecipeDto.ingredients)
    return this.getOne(id)
  }

  private async getOne(id: number) {
    return this.recipeModel.findByPk(id, RecipeService.option)
  }

  async update(recipeDto: CreateRecipeDto) {
    const { id } = recipeDto
    if (!id) {
      throw new NotFoundException('id is empty')
    }
    const foundRecipe = await this.recipeModel.findByPk(id)
    if (!foundRecipe) {
      throw new NotFoundException("recipe doesn't exist")
    }
    Object.assign(foundRecipe, recipeDto)
    await foundRecipe.save()
    const ingredientDtoList = recipeDto.ingredients
    await this.removeUnUsedIngredient(id, ingredientDtoList)
    await this.upsertIngredient(id, ingredientDtoList)
    return this.getOne(id)
  }

  private async removeUnUsedIngredient(
    recipeId: number,
    ingredientDtoList: RecipeIngredientDto[],
  ) {
    const ids = ingredientDtoList.map(({ id }) => id)
    await this.recipeIngredientModel.destroy({
      where: {
        recipeId,
        ingredientId: {
          [Op.notIn]: ids,
        },
      },
    })
  }

  private async upsertIngredient(
    recipeId: number,
    ingredientDtoList: RecipeIngredientDto[],
  ) {
    await this.checkIngredientExist(ingredientDtoList)
    const recipeIngredientDtoList = ingredientDtoList.map((ingredientDto) => {
      const ingredientId = ingredientDto.id
      const amount = ingredientDto.amount
      return {
        amount,
        recipeId,
        ingredientId,
      }
    })
    await this.recipeIngredientModel.bulkCreate(recipeIngredientDtoList, {
      updateOnDuplicate: ['amount'],
    })
  }

  private async checkIngredientExist(ingredients: RecipeIngredientDto[]) {
    const size = await this.ingredientModel.count({
      where: {
        id: {
          [Op.in]: ingredients.map(({ id }) => id),
        },
      },
    })
    if (size < ingredients.length) {
      throw new UnprocessableEntityException('ingredient is not valid')
    }
  }
}
