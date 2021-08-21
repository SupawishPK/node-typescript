import express, { Request, Response } from 'express'
import config from 'config'
import log from './config/logger'
import connect from './config/DatabaseConfig'
import routes_v1 from './api/v1/routes'
import { deserializeUser } from './api/v1/middlewares'

const port = config.get('port') as number
const host = config.get('host') as string

const app = express()
//เรียกใช้ middleware deserializeUser สิ่งนี้จะเเนบ user ให้กับทุก routes แบบนี้ get(req, 'user')
app.use(deserializeUser) 


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(port, host, (): void => {
  log.info(`Server listing at http://${host}:${port}`)
  connect()

  //routes
  routes_v1(app)
})
