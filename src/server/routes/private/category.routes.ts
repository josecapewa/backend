import { FastifyInstance } from "fastify";
import { BaseRoute } from "../base";
import { categoryService } from "@/modules/services/category";

export async function categories(app: FastifyInstance) {
    await BaseRoute.handle(app, categoryService, "/categories");
}