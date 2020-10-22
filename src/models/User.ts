import { Schema, model, Document } from "mongoose";

export interface UserInterface extends Document {
  name_complete: string;
  user: string;
  email: string;
  password: string;
  profile_picture: string;
  biography: string;
}

const UserSchema: Schema = new Schema({
  name_complete: { type: String, required: true },
  email: { type: String, required: true },
  user: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile_picture: { type: String, required: false },
  biography: { type: String, required: false },
});

export default model<UserInterface>("User_insta", UserSchema);
