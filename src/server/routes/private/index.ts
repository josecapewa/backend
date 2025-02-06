import { FastifyInstance } from "fastify";
import { authService } from "../../../modules/services/auth";
import { benefits } from "./benefit.routes";
import { categories } from "./category.routes";

/**
 * Registers private routes for the Fastify application.
 *
 * This function sets up various routes that require authentication and are intended for private access.
 * It registers a pre-handler hook for authentication and defines several routes related to students,
 * periods, classes, and other educational entities.
 *
 * @param {FastifyInstance} app - The Fastify instance to register the private routes on.
 *
 * @returns {Promise<void>} A promise that resolves when the routes have been successfully registered.
 *
 * @throws {Error} Throws an error if the registration of any route fails.
 *
 * @example
 * import fastify from 'fastify';
 * import privateRoutes from './path/to/privateRoutes';
 *
 * const app = fastify();
 * privateRoutes(app).then(() => {
 *   console.log('Private routes registered successfully');
 * }).catch(err => {
 *   console.error('Error registering private routes:', err);
 * });
 */
export default async function privateRoutes(app: FastifyInstance) {
  app.register(async (privateApp) => {
    privateApp.addHook("preHandler", authService.authenticate);
    privateApp.delete("/logout", authService.logout);
    await benefits(privateApp);
    await categories(privateApp);
  });
}
