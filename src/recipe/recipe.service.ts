import { Injectable, NotFoundException } from '@nestjs/common'
import { getMongoRepository } from 'typeorm'
import { IngredientsEntity } from '../ingredients/entity/ingredients.entity'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { RecipeResponseDto } from './dto/recipe-response.dto'
import { RecipeEntity } from './entity/recipe.entity'
import { RecipeIngredientsResponse } from './interface/recipe.interface'

@Injectable()
export class RecipeService {
  async getAll() {
    // const recipeList = await getMongoRepository(RecipeEntity).find()
    // const recipeDtoList: RecipeResponseDto[] = []
    // for (const recipe of recipeList) {
    //   const { ingredients } = recipe
    //   const recipeIngredientsResponseList: RecipeIngredientsResponse[] = []
    //   for (const ingredient of ingredients) {
    //     const { id } = ingredient
    //     const ingredientsData = await getMongoRepository(
    //       IngredientsEntity,
    //     ).findOne(id)
    //     recipeIngredientsResponseList.push({
    //       ...ingredientsData,
    //       ...ingredient,
    //     })
    //   }
    //   recipeDtoList.push({
    //     ...recipe,
    //     ingredients: recipeIngredientsResponseList,
    //   })
    // }
    // return recipeDtoList
  }

  async insert(ingredientsDto: CreateRecipeDto) {
    // return getMongoRepository(RecipeEntity).save(
    //   new RecipeEntity(ingredientsDto),
    // )
  }

  async update(recipeDto: CreateRecipeDto) {
    // const { id } = recipeDto
    // if (!id) {
    //   throw new NotFoundException('id is empty')
    // }
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
