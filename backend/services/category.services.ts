import { CategoryRepository, CategoryData } from "../repository/category.repository.ts";

export class CategoryService {
    private categoryRepository: CategoryRepository

    constructor() {
        this.categoryRepository = new CategoryRepository()
    }

    async createCategory(category: CategoryData) {
       return await this.categoryRepository.createCategory(category)
    }
}