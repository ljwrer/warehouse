import { IsNotEmpty, IsString } from 'class-validator'

export class BaseRecipeDto {
  readonly id: number
  @IsNotEmpty()
  @IsString()
  readonly name: string
  readonly url: string
  readonly text: string
}
