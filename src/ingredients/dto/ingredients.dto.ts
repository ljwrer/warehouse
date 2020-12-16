import { Unit } from '../enum/ingredients.enum';
import { Channel } from '../interface/ingredients.interface';

export interface IngredientsDto {
  readonly id: string;
  readonly name: string;
  readonly period: number;
  readonly unit: Unit;
  readonly isSeasoning: boolean;
  readonly channels: Channel[];
}
