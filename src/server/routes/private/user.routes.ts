import { FastifyInstance } from "fastify";
import { BaseRoute } from "../base";
import { userService } from "@/modules/services/user";
import { authService } from "@/modules/services/auth";

export async function users(app: FastifyInstance) {
  await BaseRoute.handle(app, userService, "users");
  app.get("/users/session", authService.getSessionData);
}
