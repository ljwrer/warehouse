import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Unit } from '../enum/ingredients.enum'
@Entity({
  name: 'ingredients',
  orderBy: {
    createdAt: 'ASC',
  },
})
@Unique(['name'])
export class IngredientsEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  unit: Unit

  @Column({ default: false })
  isSeasoning: boolean

  @Column()
  period: number

  @Column()
  createdAt: number

  @Column()
  updatedAt: number

  constructor(partial: Partial<IngredientsEntity>) {
    if (partial) {
      Object.assign(this, partial)
      const now = Date.now()
      this.createdAt = this.createdAt ?? now
      this.updatedAt = now
    }
  }
}
