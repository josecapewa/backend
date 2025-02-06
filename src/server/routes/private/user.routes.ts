import { FastifyInstance } from "fastify";
import { BaseRoute } from "../base";
import { userService } from "@/modules/services/user";
import { authService } from "@/modules/services/auth";

export async function users(app: FastifyInstance) {
  BaseRoute.handle(app, userService, "users");
  app.put("/users/simple/:id", userService.simpleUpdate);
  app.get("/users/session", authService.getSessionData);
  app.post("/users/assign", userService.assignPerson);
}
