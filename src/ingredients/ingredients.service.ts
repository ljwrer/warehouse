import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Not, Repository } from 'typeorm'
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder'
import { IngredientsDto } from './dto/ingredients.dto'
import { ChannelEntity } from './entity/channel.entity'
import { IngredientsEntity } from './entity/ingredients.entity'
import { Channel } from './interface/ingredients.interface'

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(IngredientsEntity)
    private readonly ingredientsRepository: Repository<IngredientsEntity>,
    @InjectRepository(ChannelEntity)
    private readonly channelRepository: Repository<ChannelEntity>,
  ) {}

  getAll() {
    const builder = this.ingredientsRepository.createQueryBuilder('ingredients')
    return this.join(builder).getMany()
  }

  private getOne(id) {
    const builder = this.ingredientsRepository
      .createQueryBuilder('ingredients')
      .where({
        id,
      })
    return this.join(builder).getOne()
  }

  join(builder: SelectQueryBuilder<IngredientsEntity>) {
    return builder.leftJoinAndMapMany(
      'ingredients.channels',
      ChannelEntity,
      'channel',
      'ingredients.id = channel.ingredientsId',
    )
  }

  async insert(ingredientsDto: IngredientsDto) {
    let ingredients = new IngredientsEntity()
    ingredients.name = ingredientsDto.name
    ingredients.isSeasoning = ingredientsDto.isSeasoning
    ingredients.period = ingredientsDto.period
    ingredients.unit = ingredientsDto.unit
    ingredients = await this.ingredientsRepository.save(ingredients)
    const channels = await this.insertChannel(
      ingredients.id,
      ingredientsDto.channels,
    )
    return {
      ...ingredients,
      channels,
    }
  }

  async update(ingredientsDto: IngredientsDto) {
    const { id } = ingredientsDto
    if (!id) {
      throw new NotFoundException('id is empty')
    }
    const ingredients = await this.ingredientsRepository.findOne(id)
    if (!ingredients) {
      throw new NotFoundException("ingredients doesn't exist")
    }
    await this.removeUnUsedChannel(ingredientsDto)
    await this.insertChannel(id, ingredientsDto.channels)
    Object.assign(ingredients, ingredientsDto)
    await this.ingredientsRepository.save(ingredients)
    return this.getOne(id)
  }

  private async removeUnUsedChannel(ingredientsDto: IngredientsDto) {
    const oldChannelId = ingredientsDto.channels
      .filter((ingredients) => ingredients.id)
      .map((ingredients) => ingredients.id)
    await this.channelRepository.delete({
      id: Not(In(oldChannelId)),
      ingredientsId: ingredientsDto.id,
    })
  }

  private insertChannel(ingredientsId: number, channels: Channel[]) {
    const channelList = channels.map((channelDto) => {
      const channel = new ChannelEntity()
      channel.ingredientsId = ingredientsId
      channel.name = channelDto.name
      channel.price = channelDto.price
      channel.url = channelDto.url
      if (channelDto.id) {
        channel.id = channelDto.id
      }
      return channel
    })
    return this.channelRepository.save(channelList)
  }
}
