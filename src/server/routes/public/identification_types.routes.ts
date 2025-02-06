import { FastifyInstance } from "fastify";
import { BaseRoute } from "../base";
import { identificationTypeService } from "@/modules/services/identification_type";

export async function identificationTypes(app: FastifyInstance) {
  await BaseRoute.handle(
    app,
    identificationTypeService,
    "identification_types"
  );
}
