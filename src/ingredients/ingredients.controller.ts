import { Body, Controller, Get, Post } from '@nestjs/common';
import { IngredientsDto } from './dto/ingredients.dto';
import { IngredientsService } from './ingredients.service';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly appService: IngredientsService) {}

  @Get()
  findAll() {
    return this.appService.getAll();
  }

  @Post()
  async create(@Body() ingredientsDto: IngredientsDto) {
    return this.appService.insert(ingredientsDto);
  }

  @Post()
  async update(@Body() ingredientsDto: IngredientsDto) {
    return this.appService.update(ingredientsDto);
  }
}
