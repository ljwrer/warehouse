import { Column, ObjectIdColumn } from 'typeorm';
import { Channel, IngredientsDto } from '../dto/ingredients.dto';
import { Unit } from '../enum/ingredients.enum';

export class IngredientsEntity implements IngredientsDto {
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
