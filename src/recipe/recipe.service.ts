import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { Ingredient } from '../ingredient/entity/ingredient.entity'
import { CreateRecipeDto } from './dto/create-recipe.dto'
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
  async getAll() {
    // return this.recipeRepository
    //   .createQueryBuilder('recipe')
    //   .leftJoinAndMapMany(
    //     'recipe.ingredients',
    //     RecipeIngredient,
    //     'recipeIngredients',
    //     'recipe.id = recipeIngredients.recipeId',
    //   )
    //   .leftJoinAndMapMany(
    //     'recipe.ingredients',
    //     IngredientsEntity,
    //     'ingredients',
    //     'recipeIngredients.ingredientId = ingredients.id',
    //   )
    //   .leftJoinAndMapMany(
    //     'recipe.x.channels',
    //     ChannelEntity,
    //     'channel',
    //     'channel.ingredientId = ingredients.id',
    //   )
    //   .getMany()
  }

  async insert(createRecipeDto: CreateRecipeDto) {
    const recipe = await this.recipeModel.create(createRecipeDto)
    const ingredientDtoList = createRecipeDto.ingredients
    const ingredients = await this.ingredientModel.findAll({
      where: {
        id: {
          [Op.in]: ingredientDtoList.map(({ id }) => id),
        },
      },
    })
    const { id } = recipe
    const recipeIngredientDtoList = ingredientDtoList.map(
      (ingredientDto, index) => {
        const recipeId = id
        const ingredientsId = ingredients[index].id
        const amount = ingredientDto.amount
        return {
          amount,
          recipeId,
          ingredientsId,
        }
      },
    )
    await this.recipeIngredientModel.bulkCreate(recipeIngredientDtoList)
    return this.getOne(id)
  }

  private async getOne(id: number) {
    return this.recipeModel.findByPk(id, {
      include: {
        model: Ingredient,
      },
    })
  }

  async update(recipeDto: CreateRecipeDto) {
    return recipeDto
    // const { id } = recipeDto
    // if (!id) {
    //   throw new NotFoundException('id is empty')
    // }
    // const mongo = getMongoRepository(Recipe)
    // const foundRecipe = await mongo.findOne(id)
    // if (!foundRecipe) {
    //   throw new NotFoundException("recipe doesn't exist")
    // }
    // return mongo.save(
    //   new Recipe({
    //     ...foundRecipe,
    //     ...recipeDto,
    //   }),
    // )
  }
}
