import { User } from "../models/user.ts";
import { model, Schema, Model, Document, Types } from "mongoose";
import { connect } from "../config/db.config.ts";

import { userSeed } from "../seed.ts";
import { Category } from "../models/category.ts";

interface UserData {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  quizzesCompleted: number;
  categories: number | null;
}

export class UserService {
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

  async setUserCategory(userId: string, category: string) {
    try {
      const findUser = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { categories: { _id: category } } },
        { new: true }
      );
      return findUser;
    } catch (err) {
      return err;
    }
  }
}

const newUser = new UserService();
// console.log(newUser.createUser(userSeed))
// console.log(newUser.setUserCategory('649cd40b33739b8a2d12cdef', '649cc099e3f0692b8df39650'))
console.log(newUser.getUserCategory("649cd40b33739b8a2d12cdef"));
// console.log(newUser.populateCategories('649cd40b33739b8a2d12cdef'))
