import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'
@Entity({
  name: 'recipe',
  orderBy: {
    createdAt: 'ASC',
  },
})
@Unique(['name'])
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  url: string

  // markdown
  @Column()
  text: string

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
