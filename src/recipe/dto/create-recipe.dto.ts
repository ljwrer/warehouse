import { BaseRecipeDto } from './base-recipe.dto'
import { RecipeIngredientDto } from './recipe-ingredient.dto'
export class CreateRecipeDto extends BaseRecipeDto {
  readonly ingredients: RecipeIngredientDto[]
}
