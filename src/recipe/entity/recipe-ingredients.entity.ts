import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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

  @Column()
  createdAt: number

  @Column()
  updatedAt: number

  constructor(partial: Partial<RecipeEntity>) {
    if (partial) {
      Object.assign(this, partial)
      const now = Date.now()
      this.createdAt = this.createdAt ?? now
      this.updatedAt = now
    }
  }
}
