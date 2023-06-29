import { UserService } from "../services/user.services.ts";
import { UserData } from "../repository/user.repository.ts";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUser(userId: string) {
    return await this.userService.getUser(userId);
  }

  async getUserCategory(userId: string) {
    return await this.userService.getUserCategory(userId);
  }

  async createUser(user: UserData) {
    return await this.userService.createUser(user);
  }

  async setUserCategory(userId: string, categoryId: string) {
    return await this.userService.setUserCategory(userId, categoryId);
  }
}
