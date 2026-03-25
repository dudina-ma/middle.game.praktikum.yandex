import { Sequelize } from 'sequelize-typescript'
import { Topic } from './models/Topic'
import { Comment } from './models/Comment'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: POSTGRES_HOST || 'localhost',
  port: Number(POSTGRES_PORT || 5432),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  logging: false,
  models: [Topic, Comment],
})

export const testSequelizeConnection = async (): Promise<void> => {
  await sequelize.authenticate()
  console.log('  ➜ 🎸 Sequelize connection is ready')
}

export const syncSequelizeModels = async (): Promise<void> => {
  await sequelize.sync()
  console.log('  ➜ 🎸 Sequelize models synced with database')
}
