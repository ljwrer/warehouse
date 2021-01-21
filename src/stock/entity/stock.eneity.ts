import {
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import { Ingredient } from '../../ingredient/entity/ingredient.entity'

@Table
export class Stock extends Model {
  @Default(0)
  @Column
  amount: number

  @ForeignKey(() => Ingredient)
  ingredientId: string

  @BelongsTo(() => Ingredient, {
    constraints: false,
  })
  ingredient: Ingredient
}
