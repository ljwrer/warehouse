import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
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

  @Column()
  createdAt: number

  @Column()
  updatedAt: number

  constructor(partial: Partial<MealRecipeEntity>) {
    if (partial) {
      Object.assign(this, partial)
      const now = Date.now()
      this.createdAt = this.createdAt ?? now
      this.updatedAt = now
    }
  }
}
