import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { API_KEY } from '../configs/app'

const auth = (req, res, next) => {
  const key = req.headers['X-API-Key'] || req.headers['x-api-key']

  if (!key || key !== API_KEY) {
    return res.error(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN)
  }

  next()
}

export default auth