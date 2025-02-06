import { FastifyInstance } from "fastify";
import { BaseRoute } from "../base";
import { provinceService } from "@/modules/services/province";

export async function provinces(app: FastifyInstance) {
  await BaseRoute.handle(app, provinceService, "provinces");
}
