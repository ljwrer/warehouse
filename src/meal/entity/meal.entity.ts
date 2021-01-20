import { Model, Column, HasMany } from 'sequelize-typescript'
import { Recipe } from '../../recipe/entity/recipe.entity'
import { MealStatus, MealType } from '../enum/menu.enum'

export class Meal extends Model {
  @Column
  cookDate: Date

  @Column
  type: MealType

  @Column
  status: MealStatus

  @HasMany(() => Recipe, {
    constraints: false,
    foreignKey: 'mealId',
    sourceKey: 'id',
  })
  recipes: Recipe[]
}
