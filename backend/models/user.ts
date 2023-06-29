import { model, Schema, Model, Document, Types } from "mongoose";
import { Category } from "./category.ts";
// In Mongoose, the 'extends Document' syntax is used in TypeScript
// to define an interface that represents a Mongoose document.
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  quizzesCompleted: number | null;
  categories: Types.ObjectId | null;
  timestamps?: {};
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  // email: { type: String, required: true },
  quizzesCompleted: { type: Number },
  categories: { type: Schema.Types.ObjectId, ref: "Category", default: null },
  timestamps: { createDate: Date, updatedDate: Date },
});

const UserModel: Model<IUser> = model<IUser>("User", UserSchema);
export const User = UserModel;
