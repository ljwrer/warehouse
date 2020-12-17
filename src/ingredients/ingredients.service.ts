import { Injectable, ConflictException } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { IngredientsDto } from './dto/ingredients.dto';
import { IngredientsEntity } from './entity/ingredients.entity';

@Injectable()
export class IngredientsService {
  getAll() {
    return getMongoRepository(IngredientsEntity).find();
  }

  async insert(ingredientsDto: IngredientsDto) {
    console.log(ingredientsDto);
    const { name } = ingredientsDto;
    console.log(name);
    const mongo = getMongoRepository(IngredientsEntity);
    const existIngredients = await mongo.findOne({
      name,
    });
    console.log(existIngredients);
    if (existIngredients) {
      throw new ConflictException('ingredients name exist');
    }
    return mongo.save(new IngredientsEntity(ingredientsDto));
  }

  update(ingredientsDto: IngredientsDto) {
    const { id } = ingredientsDto;
    const mongo = getMongoRepository(IngredientsEntity);
    const foundIngredients = mongo.findOne({
      id,
    });
    return mongo.save(
      new IngredientsEntity({
        ...ingredientsDto,
        ...foundIngredients,
      }),
    );
  }
}
