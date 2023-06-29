import { connect } from "../config/db.config.ts";
import { Category, Categories } from "../models/category.ts";

export interface CategoryData {
  film_and_tv: Categories;
  history: Categories;
  music: Categories;
  general_knowledge: Categories;
  sport_and_leisure: Categories;
  food_and_drink: Categories;
  arts_and_literature: Categories;
  science: Categories;
  geography: Categories;
  society_and_culture: Categories;
}

export class CategoryRepository {
  constructor() {
    connect();
  }

  async createCategory(category: CategoryData) {
    try {
      const newCategory = await Category.create(category);
      return newCategory;
    } catch (err) {
      return err;
    }
  }
}
