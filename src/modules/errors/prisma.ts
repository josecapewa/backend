import { Prisma } from "@prisma/client";
import { AppError } from "./app";
import { formatCamelCaseToTitle } from "../lib/utils";

export class PrismaErrorHandler {
  /**
   * Handles errors thrown by the Prisma client and converts them into
   * user-friendly application errors.
   *
   * This method checks the type of error and returns an instance of
   * `AppError` with a specific message and HTTP status code based on
   * the error code received from Prisma.
   *
   * @param {any} error - The error object thrown by the Prisma client.
   *
   * @returns {AppError} An instance of `AppError` with a message and
   * status code corresponding to the type of error encountered.
   *
   * @throws {AppError} Throws an `AppError` for known Prisma errors:
   * - P2002: Indicates a unique constraint violation.
   * - P2025: Indicates that a record was not found.
   * - P1001: Indicates a database connection error.
   *
   * @example
   * const error = new Prisma.PrismaClientKnownRequestError('...', { code: 'P2002', meta: { modelName: 'User' } });
   * const appError = handle(error);
   * console.log(appError.message); // Outputs: "Este(a) User já existe."
   */
  static handle(error: any): AppError {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const field = (error.meta?.modelName as string) || "";
        return new AppError(
          `Este(a) ${formatCamelCaseToTitle(field)} já existe.`,
          409
        );
      }

      if (error.code === "P2025") {
        return new AppError("Registro não encontrado.", 404);
      }
      if (error.code === "P1001") {
        return new AppError("Erro ao comunicar com o banco de dados.", 500);
      }
    }

    return new AppError("Erro de banco de dados.", 500);
  }
}
