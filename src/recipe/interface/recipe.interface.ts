import { Unit } from '../../ingredient/enum/ingredient.enum'

export interface RecipeIngredients {
  id: number
  amount: number
}

export interface RecipeIngredientsResponse extends RecipeIngredients {
  unit: Unit
  name: string
}
