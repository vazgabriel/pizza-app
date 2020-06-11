import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

dotenvExpand(dotenv.config())

const getEnvironmentVariable = (key: string) => (
  process.env[key] || (typeof window !== 'undefined' && (window as any).__ENV__ && (window as any).__ENV__[key]) || ''
)

export const appSettings = {
  baseURL: getEnvironmentVariable('REACT_APP_API_URL') as string,
}
