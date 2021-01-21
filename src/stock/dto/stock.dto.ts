import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateStockDto {
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number
  @IsNumber()
  @IsNotEmpty()
  readonly ingredientId: number
}

export class UpdateStockDto extends CreateStockDto {
  @IsNumber()
  @IsNotEmpty()
  id: number
}
