import { RecipeIngredients } from '../interface/recipe.interface'
import { BaseRecipeDto } from './base-recipe.dto'
export class CreateRecipeDto extends BaseRecipeDto {
  readonly ingredients: RecipeIngredients[]
}
