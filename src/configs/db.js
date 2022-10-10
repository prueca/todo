import { env } from '../utils'

export const CONNECT = env('DB_CONNECT', true) === '1'
export const DATABASE = env('DB_NAME', 'ProjectDB')
export const USER = env('DB_USER', 'root')
export const PASS = env('DB_PASS', '')
export const FORCE_SYNC = env('DB_FORCE_SYNC', '0') === '1'

export const OPTIONS = {
  // see service specified in docker-compose.yml
  host: env('DB_HOST', 'db'),
  port: env('DB_PORT', 3306),
  dialect: env('DB_DIALECT', 'mysql'),
  logging: env('DB_LOGS', '0') === '1' ? console.log : false
}
