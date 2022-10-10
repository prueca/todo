import { env } from '../utils'

export const APP_NAME = env('APP_NAME', 'App')
export const BASE_URL = env('BASE_URL', 'http://localhost:3000')
export const PORT = env('PORT', 3000)
