import mongoose from 'mongoose'
import { SessionDocument } from '../interfaces/session.interface'

const SessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  { timestamps: true }
)

const User = mongoose.model<SessionDocument>('Session', SessionSchema)
