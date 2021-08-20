import { DocumentDefinition } from 'mongoose'
import { UserDocument } from '../interfaces/user.interface'
import User from '../models/user.model'

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input)
  } catch (error) {
    throw new Error(error)
  }
}

function findUser() {}
