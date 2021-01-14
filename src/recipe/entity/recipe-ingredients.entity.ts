import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({
  name: 'recipe-ingredients',
  orderBy: {
    createdAt: 'ASC',
  },
})
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  recipeId: string

  @Column()
  ingredientsId: string

  @Column()
  amount: number

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
