import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
@Entity({
  name: 'meal-recipe',
  orderBy: {
    createdAt: 'ASC',
  },
})
export class MealRecipeEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  mealId: string

  @Column()
  recipeId: string

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
