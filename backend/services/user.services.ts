import { User } from "../models/user";
import { UserRepository, UserData } from "../repository/user.repository.ts";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUser(userId: string) {
    return await this.userRepository.getUser(userId);
  }

  async getUserCategory(userId: string) {
    return await this.userRepository.getUserCategory(userId);
  }

  async createUser(user: UserData) {
    return await this.userRepository.createUser(user);
  }

  async setUserCategory(userId: string, cateogoryId: string) {
    return await this.userRepository.setUserCategory(userId, cateogoryId);
  }
}



// const newUser = new UserService
// // newUser.getUser('649cd40b33739b8a2d12cdef').then(res => console.log(res))
// newUser.getUserCategory("649cd40b33739b8a2d12cdef").then(res => console.log(res))
