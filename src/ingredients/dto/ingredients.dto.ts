import { IsNotEmpty } from 'class-validator';
import { Unit } from '../enum/ingredients.enum';
import { Channel } from '../interface/ingredients.interface';
export class IngredientsDto {
  readonly id: string;
  @IsNotEmpty()
  readonly name: string;
  readonly period: number;
  readonly unit: Unit;
  readonly isSeasoning: boolean;
  readonly channels: Channel[];
}
