import jwt from 'jsonwebtoken'
import config from 'config'

const privateKey = config.get('privateKey') as string

export function sign(object: Object, options?: jwt.SignOptions) {
  return jwt.sign(object, privateKey, options)
}

export function decode(token: string) {
  try {
    // ทำการ decoded jwt token
    const decoded = jwt.verify(token, privateKey)
    // console.log("decoded: ",decoded)
    
    //return ค่า decoded กลับไป
    return { valid: true, expired: false, decoded }
  } catch (error) {

    // หาก decoded ไม่สำเร็จ หรือ jwt Token หมดอายุ
    //console.log({ error })
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    }
  }
}
