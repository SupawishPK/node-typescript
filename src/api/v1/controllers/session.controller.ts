import config from 'config'
import { Request, Response } from 'express'
import { get } from 'lodash'
import { createAccessToken, createSession, updateSession } from '../services/session.service'
import { validatePassword } from '../services/user.service'
import { sign } from '../utils/jwt.utils'

export async function createUserSessionHandler(req: Request, res: Response) {
  //validate the email and password
  const user = await validatePassword(req.body)
  console.log("user: ",user)

  if (!user) {
    return res.status(401).send('Invalid username or password')
  }
  
  //create a session
  const session = await createSession(user._id, req.get('user-agent') || '')
  console.log("session: ", session)

  //create access token
  const accessToken = await createAccessToken({ user, session })
  console.log("accessToken: ", accessToken)

  //create refresh token
  const refreshToken = sign(session, {
    expiresIn: config.get('refreshTokenTtl'), // 1 year
  })

  //send refresh & access token back
  return res.send({accessToken, refreshToken})
}

export async function invalidateUserSessionHandler(req: Request, res: Response) {


  const sessionId = get(req,"user.session")
  //req,'user.session' ได้มาจาก deserializeUser โดยได้แนบมากับ request

  await updateSession({_id:sessionId},{valid:false})

  return res.sendStatus(200)
}
