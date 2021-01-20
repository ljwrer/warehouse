import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { CreateRecipeDto } from '../dto/create-recipe.dto'
@Entity({
  name: 'recipe',
  orderBy: {
    createdAt: 'ASC',
  },
})
@Unique(['name'])
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  url: string

  // markdown
  @Column()
  text: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(createRecipeDto?: CreateRecipeDto) {
    Object.assign(this, createRecipeDto)
  }
}
