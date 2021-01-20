import { IsNotEmpty, IsString } from 'class-validator'
import { Unit } from '../enum/ingredient.enum'
import { ChannelDto } from './channel.dto'
export class IngredientDto {
  readonly id?: number
  @IsNotEmpty()
  @IsString()
  readonly name: string
  period: number
  readonly unit: Unit
  readonly isSeasoning: boolean
  channels: ChannelDto[]
}
