import { Column, HasMany, Model, Table, Unique } from 'sequelize-typescript'
import { Unit } from '../enum/ingredient.enum'
import { Channel } from './channel.entity'

@Table
export class Ingredient extends Model {
  @Unique
  @Column
  name: string

  @Column
  unit: Unit

  @Column
  isSeasoning: boolean = false

  @Column
  period: number

  @HasMany(() => Channel, {
    constraints: false,
    foreignKey: 'ingredientId',
    sourceKey: 'id',
  })
  channels: Channel[]
}
