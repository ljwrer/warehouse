import { RecipeIngredientsResponse } from '../interface/recipe.interface'
import { BaseRecipeDto } from './base-recipe.dto'

export class RecipeResponseDto extends BaseRecipeDto {
  readonly ingredients: RecipeIngredientsResponse[]
}
