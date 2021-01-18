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
    updatedAt: 'DESC',
  },
})
@Unique(['name'])
export class IngredientsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({
    type: 'enum',
    enum: Unit,
    default: Unit.kg,
  })
  unit: Unit

  @Column({ default: false })
  isSeasoning: boolean

  @Column()
  period: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
