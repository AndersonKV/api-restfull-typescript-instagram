import { Schema, model, Document } from "mongoose";

export interface PostInterface extends Document {
  id_user: string;
  post_image: {
    path: { type: String; required: true };
  };
  post_text: string;
  created_at: string;
  updated_at: string;
}

const UserSchema: Schema = new Schema({
  id_user: { type: String, required: true },
  post_image: { type: Array, required: true },
  post_text: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default model<PostInterface>("Post_insta", UserSchema);
