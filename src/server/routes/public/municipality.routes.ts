import { FastifyInstance } from "fastify";
import { BaseRoute } from "../base";
import { municipalityService } from "@/modules/services/municipality";

export async function municipalities(app: FastifyInstance) {
  await BaseRoute.handle(app, municipalityService, "municipalities");
}
