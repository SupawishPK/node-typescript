import jwt from 'jsonwebtoken'
import config from 'config'

const privateKey = config.get('privateKey') as string

export function sign(object: Object, options?: jwt.SignOptions) {
  return jwt.sign(object, privateKey, options)
}
