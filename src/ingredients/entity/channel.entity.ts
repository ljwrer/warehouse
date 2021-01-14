import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
@Entity({
  name: 'channel',
  orderBy: {
    createdAt: 'ASC',
  },
})
@Unique(['name'])
export class ChannelEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  price: number

  @Column()
  url: string

  @Column()
  ingredientsId: string

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
