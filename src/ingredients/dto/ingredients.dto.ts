import { Unit } from '../enum/ingredients.enum';

export interface Channel {
  name: string;
  price: number;
  url?: string;
}

export interface IngredientsDto {
  readonly id: string;
  readonly name: string;
  readonly period: number;
  readonly unit: Unit;
  readonly isSeasoning: boolean;
  readonly channels: Channel[];
}
