import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
  }