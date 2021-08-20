import { Express } from "express";
import {
  createUserSchema,
  createUserSessionSchema,
} from '../../../schema/user.schema'
import { createUserSessionHandler } from '../controllers/session.controller'
import { createUserHandler } from '../controllers/user.controller'
import validateRequest from '../middlewares/validateRequest'

export default function (app: Express) {
  app.get('/', () => {
    console.log('asuidhhdjpiji')
  })
  //Register User
  app.post('/register', validateRequest(createUserSchema), createUserHandler)

  //Login User
  app.post(
    '/sessions',
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  )
}
