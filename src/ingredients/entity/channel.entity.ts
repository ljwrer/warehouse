import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
@Entity({
  name: 'channel',
  orderBy: {
    updatedAt: 'DESC',
  },
})
export class ChannelEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({
    type: 'decimal',
    precision: 19,
    scale: 2,
    default: 0,
  })
  price: number

  @Column({ default: '' })
  url: string

  @Column()
  ingredientsId: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
