import { SequelizeModule } from '@nestjs/sequelize'
export const databaseModule = SequelizeModule.forRoot({
  dialect: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'ray',
  password: 'raypass',
  database: 'ware',
  autoLoadModels: true,
  dialectOptions: {
    decimalNumbers: true,
  },
})
