import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { RecipeService } from './recipe.service'

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  findAll() {
    return this.recipeService.getAll()
  }

  @Post()
  async create(@Body() ingredientsDto: CreateRecipeDto) {
    return this.recipeService.insert(ingredientsDto)
  }

  @Put()
  async update(@Body() ingredientsDto: CreateRecipeDto) {
    return this.recipeService.update(ingredientsDto)
  }
}
