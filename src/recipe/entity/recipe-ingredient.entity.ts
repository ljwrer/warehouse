import { Model, Column, Table, ForeignKey } from 'sequelize-typescript'
import { Ingredient } from '../../ingredient/entity/ingredient.entity'

@Table({
  timestamps: false,
})
export class RecipeIngredient extends Model {
  @Column
  recipeId: number

  @ForeignKey(() => Ingredient)
  @Column
  ingredientsId: number

  @Column
  amount: number
}
