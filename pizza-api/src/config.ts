import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { ConnectionOptions } from 'typeorm'

dotenvExpand(dotenv.config())

const port = parseInt(process.env.PORT, 10)
const dbPort = parseInt(process.env.DATABASE_PORT, 10)

const database: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: isNaN(dbPort) ? 5432 : dbPort,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_DATABASE || 'pizza_app',
  synchronize: Boolean(process.env.DATABASE_SYNC),
  logging: Boolean(process.env.DATABASE_LOG),
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
}

export const appSettings = {
  production: process.env.NODE_ENV === 'production',
  port: isNaN(port) ? 8080 : port,
  database,
}
