import { IsNotEmpty, IsString } from 'class-validator'
import { Unit } from '../enum/ingredients.enum'
import { Channel } from '../interface/ingredients.interface'
export class IngredientsDto {
  readonly id?: number
  @IsNotEmpty()
  @IsString()
  readonly name: string
  period: number
  readonly unit: Unit
  readonly isSeasoning: boolean
  channels: Channel[]
}
