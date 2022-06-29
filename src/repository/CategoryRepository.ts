import AppDataSource from "../config/AppDataSource";
import {Category} from "../entity/Category";

export const CategoryRepository = AppDataSource.getRepository(Category);