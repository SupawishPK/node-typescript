import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'
import { UserDocument as IUserDocument } from '../interfaces/user.interface'

export interface UserDocument extends IUserDocument {}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

// UserSchema.post('save', function() {
//   console.log('this gets printed fourth');
// });

UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
  let user = this as UserDocument
  console.log('this gets printed third')
  //only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  //Random additional data
  const salt = await bcrypt.genSalt(config.get('saltWorkFactor'))
  const hash = await bcrypt.hashSync(user.password, salt)

  //Replace the password with the hash
  user.password = hash
  return next()
})

// User for logging in
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

const User = mongoose.model('User', UserSchema)

export default User
