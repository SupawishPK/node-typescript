import { Request, Response } from 'express'
import { omit } from 'lodash'
import log from '../../../config/logger'
import { createUser } from '../services/user.service'

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body)
    console.log(user)
    return res.send(omit(user.toJSON(), 'password'))
  } catch (e) {
    log.error(e)
    return res.status(409).send(e.message)
  }
}
