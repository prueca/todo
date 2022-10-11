import { env } from '../utils'

export const APP_NAME = env('APP_NAME', 'App')
export const BASE_URL = env('BASE_URL', 'http://localhost:3000')
export const PORT = env('PORT', 3000)
export const API_KEY = env('API_KEY', '49125NpxRtYC')

export const HASHIDS_SALT = env('HASHIDS_SALT', 'r3DtgMg9qy')
export const HASHIDS_LENGTH = parseInt(env('HASHIDS_LENGTH', 12))
