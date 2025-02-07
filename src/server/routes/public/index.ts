import { FastifyInstance } from "fastify";
import { authService } from "../../../modules/services/auth";

export default async function publicRoutes(app: FastifyInstance) {
  app.post("/login", authService.login);
  // app.get("/refresh-token", authService.refreshToken);
}

