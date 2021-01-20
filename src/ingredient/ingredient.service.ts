import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { FindOptions } from 'sequelize/types/lib/model'
import { ChannelDto } from './dto/channel.dto'
import { IngredientDto } from './dto/ingredient.dto'
import { Channel } from './entity/channel.entity'
import { Ingredient } from './entity/ingredient.entity'

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(Ingredient)
    private ingredientModel: typeof Ingredient,
    @InjectModel(Channel)
    private channelModel: typeof Channel,
  ) {}

  static option: FindOptions = {
    include: {
      model: Channel,
      attributes: {
        exclude: ['ingredientId'],
      },
    },
    order: [['updatedAt', 'DESC']],
  }

  getAll() {
    return this.ingredientModel.findAll(IngredientService.option)
  }

  async insert(ingredientDto: IngredientDto) {
    const { id } = await this.ingredientModel.create(ingredientDto)
    await this.upsertChannel(id, ingredientDto.channels)
    return this.getOne(id)
  }

  private getOne(id) {
    return this.ingredientModel.findByPk(id, IngredientService.option)
  }

  async update(ingredientDto: IngredientDto) {
    const { id } = ingredientDto
    if (!id) {
      throw new NotFoundException('id is empty')
    }
    const ingredient = await this.ingredientModel.findByPk(id)
    if (!ingredient) {
      throw new NotFoundException("ingredient doesn't exist")
    }
    await this.removeUnUsedChannel(ingredientDto)
    await this.upsertChannel(id, ingredientDto.channels)
    Object.assign(ingredient, ingredientDto)
    await ingredient.save()
    return this.getOne(id)
  }

  private async removeUnUsedChannel(ingredientDto: IngredientDto) {
    const oldChannelIds = ingredientDto.channels
      .filter((ingredients) => ingredients.id)
      .map((ingredients) => ingredients.id)
    await this.channelModel.destroy({
      where: {
        id: {
          [Op.notIn]: oldChannelIds,
        },
        ingredientId: ingredientDto.id,
      },
    })
  }

  private upsertChannel(ingredientId: number, channels: ChannelDto[]) {
    const channelList = channels.map((channelDto) => {
      return {
        ...channelDto,
        ingredientId,
      }
    })
    return this.channelModel.bulkCreate(channelList, {
      updateOnDuplicate: ['name', 'price', 'url'],
    })
  }
}
