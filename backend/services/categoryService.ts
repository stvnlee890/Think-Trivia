import { Category } from "../models/category.ts";
import { connect } from "../config/db.config.ts";

export class CategoryService {
  constructor() {
    connect(); // Ensure the database connection is established
  }

  async getAllCategories() {
    try {
      const result = await Category.find({});
      console.log(result);
      return result
    } catch (err) {
      console.log(err);
      return err
    }
  }
}
const api = new CategoryService();
console.log(api.getAllCategories());
