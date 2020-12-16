import { Injectable } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { IngredientsDto } from './dto/ingredients.dto';
import { IngredientsEntity } from './entity/ingredients.entity';

@Injectable()
export class IngredientsService {
  getAll() {
    return getMongoRepository(IngredientsEntity).find();
  }

  insert(ingredientsDto: IngredientsDto) {
    return getMongoRepository(IngredientsEntity).save(
      new IngredientsEntity(ingredientsDto),
    );
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
