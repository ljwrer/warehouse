import { TypeOrmModule } from '@nestjs/typeorm'

export const typeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'ray',
  password: 'raypass',
  database: 'ware',
  autoLoadEntities: true,
  synchronize: true,
  bigNumberStrings: false,
  extra: {
    decimalNumbers: true,
  },
  // logging: true,
})
