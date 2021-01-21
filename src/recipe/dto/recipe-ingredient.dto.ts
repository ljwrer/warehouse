import { Unit } from '../../ingredient/enum/ingredient.enum'

export interface RecipeIngredientDto {
  id: number
  amount: number
}

export interface RecipeIngredientResponseDto extends RecipeIngredientDto {
  unit: Unit
  name: string
}
