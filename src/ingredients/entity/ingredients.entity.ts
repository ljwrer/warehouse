import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
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

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
