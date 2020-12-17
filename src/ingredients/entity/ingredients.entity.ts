import { Column, Entity, ObjectIdColumn, Unique } from 'typeorm';
import { Unit } from '../enum/ingredients.enum';
import { Channel } from '../interface/ingredients.interface';
@Entity({
  name: 'ingredients',
  orderBy: {
    createdAt: 'ASC',
  },
})
@Unique(['name'])
export class IngredientsEntity {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  unit: Unit;

  @Column({ default: [] })
  channels: Channel[];

  @Column({ default: false })
  isSeasoning: boolean;

  @Column()
  period: number;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;

  constructor(partial: Partial<IngredientsEntity>) {
    if (partial) {
      Object.assign(this, partial);
      const now = Date.now();
      this.createdAt = this.createdAt ?? now;
      this.updatedAt = now;
    }
  }
}
