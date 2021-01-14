import { Injectable, NotFoundException } from '@nestjs/common'
import { getMongoRepository } from 'typeorm'
import { IngredientsDto } from './dto/ingredients.dto'
import { IngredientsEntity } from './entity/ingredients.entity'

@Injectable()
export class IngredientsService {
  getAll() {
    return getMongoRepository(IngredientsEntity).find()
  }

  async insert(ingredientsDto: IngredientsDto) {
    return getMongoRepository(IngredientsEntity).save(
      new IngredientsEntity(ingredientsDto),
    )
  }

  async update(ingredientsDto: IngredientsDto) {
    const { id } = ingredientsDto
    if (!id) {
      throw new NotFoundException('id is empty')
    }
    const mongo = getMongoRepository(IngredientsEntity)
    const foundIngredients = await mongo.findOne(id)
    if (!foundIngredients) {
      throw new NotFoundException("ingredients doesn't exist")
    }
    return mongo.save(
      new IngredientsEntity({
        ...foundIngredients,
        ...ingredientsDto,
      }),
    )
  }
}
