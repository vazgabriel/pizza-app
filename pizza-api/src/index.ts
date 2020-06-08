import 'reflect-metadata'
import { createConnection } from 'typeorm'

import { app } from './server'
import { appSettings } from './config'

createConnection(appSettings.database)
  .then(async (connection) => {
    app.listen(appSettings.port, () =>
      console.log(`API listening at PORT ${appSettings.port}`)
    )
  })
  .catch((error) => console.log(error))
