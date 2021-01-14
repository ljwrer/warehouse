import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { MealType } from '../enum/menu.enum'
@Entity({
  name: 'meal',
  orderBy: {
    createdAt: 'ASC',
  },
})
export class MealEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  time: Date

  @Column()
  type: MealType

  @Column()
  createdAt: number

  @Column()
  updatedAt: number

  constructor(partial: Partial<MealEntity>) {
    if (partial) {
      Object.assign(this, partial)
      const now = Date.now()
      this.createdAt = this.createdAt ?? now
      this.updatedAt = now
    }
  }
}
