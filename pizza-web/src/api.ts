import axios from 'axios'

import { appSettings } from './config'

export const api = axios.create({
  baseURL: appSettings.baseURL,
})
