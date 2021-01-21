import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { CreateStockDto, UpdateStockDto } from './dto/stock.dto'
import { StockService } from './stock.service'

@Controller('stock')
export class StockController {
  constructor(private readonly recipeService: StockService) {}

  @Get()
  findAll() {
    return this.recipeService.getAll()
  }

  @Post()
  async create(@Body() createStockDto: CreateStockDto) {
    return this.recipeService.insert(createStockDto)
  }

  @Put()
  async update(@Body() updateStockDto: UpdateStockDto) {
    return this.recipeService.update(updateStockDto)
  }
}
