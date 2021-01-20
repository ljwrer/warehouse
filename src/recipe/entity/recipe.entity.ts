import {
  BelongsToMany,
  Column,
  Default,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript'
import { Ingredient } from '../../ingredient/entity/ingredient.entity'
import { RecipeIngredient } from './recipe-ingredient.entity'

@Table
export class Recipe extends Model {
  @Unique
  @Column
  name: string

  @Default('')
  @Column
  url: string

  // markdown
  @Default('')
  @Column
  text: string

  @BelongsToMany(() => Ingredient, {
    constraints: false,
    foreignKey: 'recipeId',
    sourceKey: 'id',
    through: () => RecipeIngredient,
  })
  ingredients: Ingredient[]
}
