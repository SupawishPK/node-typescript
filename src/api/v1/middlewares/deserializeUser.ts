import { get } from 'lodash'
import { Request, Response, NextFunction } from 'express'
import { decode } from '../utils/jwt.utils'
import { reIssueAccessToken } from '../services/session.service'

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //รับ accessToken จาก BearerToken ที่ Authorization
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  )

  //รับ refreshToken จาก header : x-refresh
  const refreshToken = get(req, 'headers.x-refresh')

  //ถ้าไม่มี accessToken return 403 Forbidden
  if (!accessToken) return next()

  // ประกาศ decoded, expired มารับค่า return หลังจาก decode
  // return { 
  //   valid: true, 
  //   expired: false, 
  //   decoded 
  // }
  const { decoded, expired } = decode(accessToken)
  //console.log(decoded) //ค่าที่ได้จากการ decoded
  //console.log(expired) //expired: false

  //ถ้า jwt Token ไม่หมดอายุ โดยสามารถ decoded ได้
  if (decoded) {
    // @ts-ignore //กำหนดให้ req.user = decoded
    
    req.user = decoded

    return next()
  }

  //ถ้า jwt Token หมดอายุ ไม่สามารถ decoded ได้
  //เช็คว่ามี expired !== false && มี refreshToken
  if (expired && refreshToken) {

    const newAccessToken = await reIssueAccessToken({ refreshToken })

    if (newAccessToken) {
      // Add the new access token to the response header
      res.setHeader('x-access-token', newAccessToken)

      const { decoded } = decode(newAccessToken)

      // @ts-ignore
      req.user = decoded
    }

    return next()
  }

  return next()
}

export default deserializeUser
