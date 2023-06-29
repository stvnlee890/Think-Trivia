import { User } from "../models/user.ts";
import { model, Schema, Model, Document, Types } from "mongoose";
import { connect } from "../config/db.config.ts";

import { userSeed } from "../seed.ts";
import { Category } from "../models/category.ts";

interface UserData {
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    quizzesCompleted: number,
    categories: number | null,
}

export class UserService {
  constructor() {
    connect();
  }

  async getUser(userId: string) {
    try {
        const findUser = await User.findById(userId)
        console.log(findUser)
    } catch(err) {
        console.log(err)
    }
  }


  async getUserCategory(userId: string) {
    try {
        const findUser = await User.findById(userId)
        const id = findUser?.categories!.toString()
        const findCategory = await Category.findById(id)
        console.log(findCategory)
    } catch(err) {
        console.log(err)
    }
  }

  async createUser(user: UserData) {
    try {
      const result = await User.create(user);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  async setCategories(userId: string, category:any) {
    try {
        const findUser = await User.findOneAndUpdate(
            { '_id': userId },
            { $set: { categories: { '_id': category } } },
            { new: true }
        )
        console.log(findUser)
       
    } catch(err) {
        console.log(err)
    }
  } 
// async populateCategories(userId: string) {
//     try {
//         const populateUser = await User.findOne({ '_id': userId }).populate('categories')
//         console.log(populateUser)
//     } catch(err) { 
//         console.log(err)
//     }
// }
}

const newUser = new UserService()
// console.log(newUser.createUser(userSeed))
// console.log(newUser.setCategories('649cd40b33739b8a2d12cdef', '649cc099e3f0692b8df39650'))
console.log(newUser.getUserCategory('649cd40b33739b8a2d12cdef'))
// console.log(newUser.populateCategories('649cd40b33739b8a2d12cdef'))