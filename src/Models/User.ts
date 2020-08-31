import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  _id: string,
  scoresaberId?: string,
  avatar?: string,
}

export const UserSchema = new mongoose.Schema({
  _id: String,
  scoresaberId: String,
  avatar: String,
})

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
