import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  scoresaberId?: string,
}

export const UserSchema = new mongoose.Schema({
  scoresaberId: String,
})

const User = mongoose.model<User>('User', UserSchema);
export default User;
