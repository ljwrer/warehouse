import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { IngredientDto } from './dto/ingredient.dto'
import { IngredientService } from './ingredient.service'

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientsService: IngredientService) {}

  @Get()
  findAll() {
    return this.ingredientsService.getAll()
  }

  @Post()
  async create(@Body() ingredientsDto: IngredientDto) {
    return this.ingredientsService.insert(ingredientsDto)
  }

  @Put()
  async update(@Body() ingredientsDto: IngredientDto) {
    return this.ingredientsService.update(ingredientsDto)
  }
}
