import { categoryModel } from "../models/category";
import { categoryValidations } from "../validations/category";
import { BaseService } from "./base";

class CategoryService extends BaseService {
    model = categoryModel;
    createValidationSchema = categoryValidations.getData;
    updateValidationSchema = categoryValidations.getDataToUpdate;
}

export const categoryService = new CategoryService();