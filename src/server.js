import app from './app'
import { sequelize } from './models'
import { PORT } from './configs/app'
import { FORCE_SYNC, CONNECT } from './configs/db'

const init = async () => {
  CONNECT && await sequelize.authenticate()
  CONNECT && await sequelize.sync({ force: FORCE_SYNC })
  app.listen(PORT, () => console.log(`App running on port ${PORT}!`))
}

init()
