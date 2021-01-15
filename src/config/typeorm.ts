import { TypeOrmModule } from '@nestjs/typeorm'

export const typeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'test',
  password: 'test',
  database: 'ware',
  autoLoadEntities: true,
  synchronize: true,
})
