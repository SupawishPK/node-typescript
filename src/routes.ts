import { Express } from 'express'
import userRoute from './api/v1/routes/user.route'

export default function (app: Express) {
  app.use('/api/users', userRoute)
}
