import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { appSettings } from './config'

const app = express()

if (!appSettings.production) {
  app.use(morgan('dev'))
}

app.use(cors())
app.use(express.json())

export { app }
