import { omit } from 'lodash'
import { DocumentDefinition } from 'mongoose'
import { UserDocument } from '../interfaces/user.interface'
import User from '../models/user.model'

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    //Create User
    const create = await User.create(input)
    return create
  } catch (error) {
    throw new Error(error)
  }
}

function findUser() {}

export async function validatePassword({
  email,
  password,
}: {
  email: UserDocument['email']
  password: string
}) {
  const user = await User.findOne({ email })

  if (!user) {
    return false
  }

  const isValid = await user.comparePassword(password)

  if (!isValid) {
    return false
  }

  return omit(user.toJSON(), 'password')
}
