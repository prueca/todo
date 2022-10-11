import Hashids from 'hashids'
import { HASHIDS_SALT, HASHIDS_LENGTH } from '../configs/app'

const hashids = new Hashids(HASHIDS_SALT, HASHIDS_LENGTH)

const decode = (hash, all = false) => {
  const num = hashids.decode(hash)
  num.pop()

  return all ? num : num[0]
}

export default decode