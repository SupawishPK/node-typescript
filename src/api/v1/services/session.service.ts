import config from 'config'
import { Omit } from 'lodash'
import { FilterQuery, LeanDocument, UpdateQuery } from 'mongoose'
import Session, { SessionDocument } from '../models/session.model'
import { decode, sign } from '../utils/jwt.utils'
import { get } from 'lodash'
import { findUser } from './user.service'

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

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string
}) {
  //Decode the refresh token
  const { decoded } = decode(refreshToken)

  // ถ้า decoded ไม่ได้ return false
  if (!decoded || !get(decoded, '_id')) return false

  // Get the session 
  const session = await Session.findById(get(decoded, '_id'))

  //Make sure the session is still valid 
  //ถ้า session ยังคงใช้ได้อยู่ return false
  if (!session || !session?.valid) return false

  // เช็คว่ายังมี user อยู่หรือป่าว
  const user = await findUser({ _id: session.user })

  if (!user) return false

  // สร้าง accessToken ใหม่
  const accessToken = createAccessToken({ user, session })

  return accessToken
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return Session.updateOne(query, update)
}
