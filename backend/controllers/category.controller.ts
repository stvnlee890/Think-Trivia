import { CategoryService } from "../services/category.services.ts";
import { CategoryData } from "../repository/category.repository";

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  async createCategory(category: CategoryData) {
    return await this.categoryService.createCategory(category);
  }
}
