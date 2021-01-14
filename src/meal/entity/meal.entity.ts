import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { MealStatus, MealType } from '../enum/menu.enum'
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
  status: MealStatus

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
