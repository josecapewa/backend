import { Categoria, Prisma } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";


const categoryInclude = {
    beneficios: true,
} as Prisma.CategoriaInclude

class CategoryModel extends BaseModel<Categoria> {
    model = prisma.categoria;
    include = categoryInclude;
}

export const categoryModel = new CategoryModel();