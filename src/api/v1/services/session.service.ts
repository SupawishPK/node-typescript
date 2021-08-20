import config from 'config'
import { Omit } from 'lodash'
import { LeanDocument } from 'mongoose'
import Session, { SessionDocument } from '../models/session.model'
import { UserDocument } from '../models/user.model'
import { sign } from '../utils/jwt.utils'

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent })

  return session.toJSON()
}

export async function createAccessToken({
  user,
  session,
}: {
  user: Omit<any, 'password'> | LeanDocument<Omit<any, 'password'>>
  session:
    | Omit<SessionDocument, 'password'>
    | LeanDocument<Omit<SessionDocument, 'password'>>
}) {
  //Build and return the new access token
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTtl') } // 15 minutes
  )

  return accessToken
}
