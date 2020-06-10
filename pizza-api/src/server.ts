import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { appSettings } from './config'
import { routes } from './app/routes'

const app = express()

if (!appSettings.production) {
  app.use(morgan('dev'))
}

app.use(cors())
app.use(express.json())
app.use(routes)

export { app }
