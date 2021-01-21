import { BaseRecipeDto } from './base-recipe.dto'
import { RecipeIngredientResponseDto } from './recipe-ingredient.dto'

export class RecipeResponseDto extends BaseRecipeDto {
  readonly ingredients: RecipeIngredientResponseDto[]
}
