import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getMetadataArgsStorage, createConnection } from 'typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

import config from '../config.orm';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const options: MongoConnectionOptions = {
      ...config,
      type: 'mongodb',
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      logging: true,
    };
    createConnection(options)
      .then(() => {
        Logger.log(`☁️  Database connected`, 'TypeORM', false);
      })
      .catch(() => {
        // logger.error(err)
        Logger.error(`❌  Database connect error`, '', 'TypeORM', false);
      });

    return options;
  }
}
