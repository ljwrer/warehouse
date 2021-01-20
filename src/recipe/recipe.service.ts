import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ChannelEntity } from '../ingredients/entity/channel.entity'
import { IngredientsEntity } from '../ingredients/entity/ingredients.entity'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { RecipeIngredientsEntity } from './entity/recipe-ingredients.entity'
import { RecipeEntity } from './entity/recipe.entity'

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(RecipeIngredientsEntity)
    private readonly recipeIngredientsRepository: Repository<RecipeIngredientsEntity>,
    @InjectRepository(IngredientsEntity)
    private readonly ingredientsEntity: Repository<IngredientsEntity>,
  ) {}
  async getAll() {
    return this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndMapMany(
        'recipe.ingredients',
        RecipeIngredientsEntity,
        'recipeIngredients',
        'recipe.id = recipeIngredients.recipeId',
      )
      .leftJoinAndMapMany(
        'recipe.ingredients',
        IngredientsEntity,
        'ingredients',
        'recipeIngredients.ingredientId = ingredients.id',
      )
      .leftJoinAndMapMany(
        'recipe.x.channels',
        ChannelEntity,
        'channel',
        'channel.ingredientId = ingredients.id',
      )
      .getMany()
  }

  async insert(createRecipeDto: CreateRecipeDto) {
    const recipe = new RecipeEntity(createRecipeDto)
    const ingredientsList = createRecipeDto.ingredients
    const ingredientsEntityList = await this.ingredientsEntity.findByIds(
      ingredientsList,
    )
    const { id } = await this.recipeRepository.save(recipe)
    const recipeIngredientsEntityList = ingredientsList.map(
      (ingredients, index) => {
        const recipeId = id
        const ingredientsId = ingredientsEntityList[index].id
        const amount = ingredients.amount
        return new RecipeIngredientsEntity({
          amount,
          recipeId,
          ingredientsId,
        })
      },
    )
    await this.recipeIngredientsRepository.save(recipeIngredientsEntityList)
  }

  async update(recipeDto: CreateRecipeDto) {
    const { id } = recipeDto
    if (!id) {
      throw new NotFoundException('id is empty')
    }
    // const mongo = getMongoRepository(RecipeEntity)
    // const foundRecipe = await mongo.findOne(id)
    // if (!foundRecipe) {
    //   throw new NotFoundException("recipe doesn't exist")
    // }
    // return mongo.save(
    //   new RecipeEntity({
    //     ...foundRecipe,
    //     ...recipeDto,
    //   }),
    // )
  }
}
