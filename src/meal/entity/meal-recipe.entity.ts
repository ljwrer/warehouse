import { Model, Column, Table } from 'sequelize-typescript'

@Table({
  timestamps: false,
})
export class MealRecipe extends Model {
  @Column
  mealId: number

  @Column
  recipeId: number
}
