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
  id: number

  @Column()
  recipeId: number

  @Column()
  ingredientsId: number

  @Column()
  amount: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
