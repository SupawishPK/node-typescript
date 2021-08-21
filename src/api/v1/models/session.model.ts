import mongoose from 'mongoose'
import { SessionDocument as ISessionDocument } from '../interfaces/session.interface'

export interface SessionDocument extends ISessionDocument {}

const SessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  { timestamps: true }
)

const Session = mongoose.model<SessionDocument>('Session', SessionSchema)

export default Session
