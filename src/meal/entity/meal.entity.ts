import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
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

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
