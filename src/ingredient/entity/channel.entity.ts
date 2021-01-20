import { Table, Column, Model, DataType, BelongsTo } from 'sequelize-typescript'
import { Ingredient } from './ingredient.entity'

@Table({
  timestamps: false,
})
export class Channel extends Model {
  @Column
  name: string

  @Column(DataType.DECIMAL(19, 2))
  price: number

  @Column
  url: string = ''

  @Column
  ingredientId: number

  @BelongsTo(() => Ingredient, {
    constraints: false,
    foreignKey: 'ingredientId',
    targetKey: 'id',
  })
  ingredient: Ingredient
}
