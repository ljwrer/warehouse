import { IsNotEmpty, IsString } from 'class-validator'

export class BaseRecipeDto {
  readonly id: string
  @IsNotEmpty()
  @IsString()
  readonly name: string
  readonly url: string
  readonly text: string
}
