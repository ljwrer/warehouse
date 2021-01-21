import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { FindOptions } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { Ingredient } from '../ingredient/entity/ingredient.entity'
import { CreateStockDto, UpdateStockDto } from './dto/stock.dto'
import { Stock } from './entity/stock.eneity'

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock)
    private stockModel: typeof Stock,
    @InjectModel(Ingredient)
    private ingredientModel: typeof Ingredient,
  ) {}

  static option: FindOptions = {
    attributes: [
      'id',
      'amount',
      'updatedAt',
      'ingredientId',
      [Sequelize.literal('ingredient.name'), 'name'],
    ],
    include: {
      model: Ingredient,
      attributes: [],
    },
  }

  async getAll() {
    return this.stockModel.findAll(StockService.option)
  }

  async insert(createStockDto: CreateStockDto) {
    await this.checkIfIngredientExist(createStockDto.ingredientId)
    const { id } = await this.stockModel.create(createStockDto)
    return this.getOne(id)
  }

  async update(updateStockDto: UpdateStockDto) {
    const { id } = updateStockDto
    if (!id) {
      throw new NotFoundException('stock id is empty')
    }
    await this.checkIfIngredientExist(updateStockDto.ingredientId)
    const stock = await this.stockModel.findByPk(id)
    if (!stock) {
      throw new NotFoundException('stock id is not valid')
    }
    stock.amount = updateStockDto.amount
    await stock.save()
    return this.getOne(id)
  }

  private async getOne(id: number) {
    return this.stockModel.findByPk(id, StockService.option)
  }

  private async checkIfIngredientExist(id: number) {
    const size = await this.stockModel.count({
      where: {
        id,
      },
    })
    if (size < 0) {
      throw new UnprocessableEntityException('invalid ingredient id')
    }
  }
}
