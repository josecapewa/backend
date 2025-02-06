import { FastifyInstance } from "fastify";
import { BaseRoute } from "../base";
import { cardService } from "@/modules/services/card";

export async function cards(app: FastifyInstance) {
    await BaseRoute.handle(app, cardService, "/cards");
}