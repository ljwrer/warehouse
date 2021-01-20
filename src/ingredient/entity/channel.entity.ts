import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

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

  @Column
  ingredientId: number
}
