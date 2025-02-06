import { FastifyInstance } from "fastify";
import { BaseRoute } from "../base";
import { benefitService } from "@/modules/services/benefit";

export async function benefits(app: FastifyInstance) {
    await BaseRoute.handle(app, benefitService, "/benefits");
}