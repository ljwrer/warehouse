import { Model, Column, Table, ForeignKey } from 'sequelize-typescript'
import { Ingredient } from '../../ingredient/entity/ingredient.entity'
import { Recipe } from './recipe.entity'

@Table({
  timestamps: false,
})
export class RecipeIngredient extends Model {
  @ForeignKey(() => Recipe)
  @Column
  recipeId: number

  @ForeignKey(() => Ingredient)
  @Column
  ingredientId: number

  @Column
  amount: number
}
