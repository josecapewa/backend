import { FastifyInstance } from "fastify";
import { BaseRoute } from "../base";
import { comuneService } from "@/modules/services/comune";

export async function comunes(app: FastifyInstance) {
  await BaseRoute.handle(app, comuneService, "communes");
}
