import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  ForeignKey,
} from 'sequelize-typescript'
import { Ingredient } from './ingredient.entity'

@Table({
  timestamps: false,
})
export class Channel extends Model {
  @Column
  name: string

  @Column(DataType.DECIMAL(19, 2))
  price: number

  @Default('')
  @Column
  url: string

  @ForeignKey(() => Ingredient)
  ingredientId: number
}
