import Hashids from 'hashids'
import { HASHIDS_SALT, HASHIDS_LENGTH } from '../configs/app'

const hashids = new Hashids(HASHIDS_SALT, HASHIDS_LENGTH)

const encode = (...int) => {
  const num = [...int, Date.now()]

  return hashids.encode(...num)
}

export default encode