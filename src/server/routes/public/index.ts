import { FastifyInstance } from "fastify";
import { userService } from "../../../modules/services/user";
import { authService } from "../../../modules/services/auth";
import { municipalities } from "./municipality.routes";
import { provinces } from "./province.routes";
import { comunes } from "./comune.routes";
import { identificationTypes } from "./identification_types.routes";

export default async function publicRoutes(app: FastifyInstance) {
  app.post("/login", authService.login);
  // app.get("/refresh-token", authService.refreshToken);
  await municipalities(app);
  await provinces(app);
  await comunes(app);
  await identificationTypes(app);
}

