import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChannelEntity } from './entity/channel.entity'
import { IngredientsEntity } from './entity/ingredients.entity'
import { IngredientsController } from './ingredients.controller'
import { IngredientsService } from './ingredients.service'

@Module({
  imports: [TypeOrmModule.forFeature([IngredientsEntity, ChannelEntity])],
  controllers: [IngredientsController],
  providers: [IngredientsService],
})
export class IngredientsModule {}
