import { connect } from "../config/db.config.ts";
import { User } from "../models/user.ts";
import { Category } from "../models/category.ts";

export interface UserData {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  quizzesCompleted: number;
  categories: number | null;
}

export class UserRepository {
  constructor() {
    connect();
  }

  async getUser(userId: string) {
    try {
      const findUser = await User.findById(userId);
      return findUser;
    } catch (err) {
      return err;
    }
  }

  async getUserCategory(userId: string) {
    try {
      const findUser = await User.findById(userId);
      const id = findUser?.categories!.toString();
      const getCategory = await Category.findById(id);
      return getCategory;
    } catch (err) {
      return err;
    }
  }

  async createUser(user: UserData) {
    try {
      const newUser = await User.create(user);
      return newUser;
    } catch (err) {
      return err;
    }
  }

  async setUserCategory(userId: string, categoryId: string) {
    try {
      const findUser = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { categories: { _id: categoryId } } },
        { new: true }
      );
      return findUser;
    } catch (err) {
      return err;
    }
  }
}
