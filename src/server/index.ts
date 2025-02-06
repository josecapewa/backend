import fastify from "fastify";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import privateRoutes from "./routes/private";
import publicRoutes from "./routes/public";
import fastifyCookie from "@fastify/cookie";
import prisma from "@/modules/lib/prisma";
import dayjs from "dayjs";
import helmet from "@fastify/helmet";
import "dayjs/locale/pt";
import { ErrorsHandler } from "@/modules/errors/handler";

dayjs.locale("pt");

const app = fastify({
  logger: true,
});

const port = Number(process.env.PORT) || 5000;

const listeners = ["SIGINT", "SIGTERM"];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close();
    process.exit(0);
  });
});

const start = async () => {
  try {
    app.setErrorHandler((error, _, reply) => {
      ErrorsHandler.handle(error, reply);
    });

    await app.register(cors, {
      origin: process.env.CROSS_ORIGIN,
      credentials: true,
    });

    await app.register(jwt, {
      secret: process.env.JWT_SECRET || "secret",
      sign: {
        expiresIn: Number(process.env.JWT_EXPIRES_IN),
      },
    });
    app.addHook("preHandler", (req, res, next) => {
      req.jwt = app.jwt;
      return next();
    });

    app.addHook("onClose", async () => {
      await prisma.$disconnect();
    });

    app.register(fastifyCookie, {
      secret: process.env.COOKIE_SECRET!,
      hook: "preHandler",
      parseOptions: {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        httpOnly: true,
      },
    });

    await app.register(multipart, {
      limits: {
        fieldNameSize: 100,
        fieldSize: 1024 * 1024 * 5,
        fields: 1000,
        fileSize: 1024 * 1024 * 50,
        files: 70,
        headerPairs: 2000,
        parts: 1000,
      },
      attachFieldsToBody: true,
    });
    await app.register(helmet);

    await app.register(privateRoutes);
    await app.register(publicRoutes);

    await app.listen({ port, host: "0.0.0.0" });
  } catch (err) {
    console.log(err);
    app.log.error(err);
    process.exit(1);
  }
};

start();
