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
  id: number

  @Column()
  mealId: number

  @Column()
  recipeId: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
