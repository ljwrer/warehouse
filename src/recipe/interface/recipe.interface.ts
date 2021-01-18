import { Unit } from '../../ingredients/enum/ingredients.enum'

export interface RecipeIngredients {
  id: number
  amount: number
}

export interface RecipeIngredientsResponse extends RecipeIngredients {
  unit: Unit
  name: string
}
