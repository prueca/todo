import 'dotenv/config'
import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import corsConfig from './configs/cors'
import routes from './routes'

const app = express()
const isProd = process.env.NODE_ENV === 'production'

// middleware
!isProd && app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors(corsConfig))

// routes
app.use('/', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
