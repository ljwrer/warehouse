import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'
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

  @Column()
  createdAt: number

  @Column()
  updatedAt: number

  constructor(partial: Partial<ChannelEntity>) {
    if (partial) {
      Object.assign(this, partial)
      const now = Date.now()
      this.createdAt = this.createdAt ?? now
      this.updatedAt = now
    }
  }
}
