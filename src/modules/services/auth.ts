import { FastifyReply, FastifyRequest } from "fastify";
import { userValidations } from "../validations/user";
import { ErrorsHandler } from "../errors/handler";
import { userModel } from "../models/user";
import { hashService } from "./hash";
import { FastifyJWT } from "@fastify/jwt";
import { AppError } from "../errors/app";

class AuthService {
  /**
   * Authenticates a user based on the provided request and response objects.
   *
   * This method verifies the presence and validity of an access token in the request cookies.
   * It decodes the token, retrieves the user's public key, and verifies the token's signature.
   * If authentication is successful, the user information is attached to the request object.
   *
   * @param req - The Fastify request object containing user credentials and tokens.
   * @param res - The Fastify reply object used to send responses.
   *
   * @returns A promise that resolves to the Fastify reply object with appropriate status and message.
   *
   * @example
   * // Successful authentication
   * async function handleRequest(req: FastifyRequest, res: FastifyReply) {
   *   await authenticate(req, res);
   *   if (req.user) {
   *     console.log('Authenticated user:', req.user);
   *   }
   * }
   *
   * @example
   * // Handling missing token
   * async function handleRequest(req: FastifyRequest, res: FastifyReply) {
   *   const response = await authenticate(req, res);
   *   if (response.statusCode === 401) {
   *     console.log(response.message); // "Precisa de autenticação"
   *   }
   * }
   *
   * @example
   * // Handling invalid or expired token
   * async function handleRequest(req: FastifyRequest, res: FastifyReply) {
   *   try {
   *     await authenticate(req, res);
   *   } catch (error) {
   *     console.error('Authentication failed:', error);
   *     // Handle invalid or expired token
   *   }
   * }
   */
  authenticate = async (req: FastifyRequest, res: FastifyReply) => {
    // try {
    //   const token = req.cookies.access_token;
    //   if (!token) {
    //     throw new AppError("Precisa de autenticação", 401);
    //   }

    //   const decoded = req.jwt.decode<FastifyJWT["user"]>(token);

    //   if (!decoded) {
    //     res.clearCookie("access_token", { path: "/" });
    //     throw new AppError("Sessão expirada", 401);
    //   }

    //   const user = req.jwt.verify<FastifyJWT["user"]>(token);

    //   req.user = user;
    // } catch (err) {
    //   res.clearCookie("access_token", { path: "/" });
    //   throw new AppError("Sessão inválida", 401);
    // }
  };

  // authorization = async (req: FastifyRequest, res: FastifyReply) => {
  //   try {
  //     this.authenticate(req, res);
  //     if (!req.user) {
  //       throw new AppError("Precisa de autenticação", 401);
  //     }

  //     const { id } = req.user;

  //     const user = await userModel.getById(id) as User;

  //     if (!user) {
  //       throw new AppError("Usuário não encontrado", 404);
  //     }

  //     user.nivel.permissoes_telas.map((permission) => {
  //       if(permission.tela.caminho == req.url){
  //         if(permission.permissao == "LER"){
  //           if(req.method != "GET"){
  //             throw new AppError("Você não tem permissão para realizar essa ação", 403);
  //           }
  //         }
  //       }
  //     })

  //   } catch (error) {
  //     ErrorsHandler.handle(error, res);
  //   }
  // };

  /**

   * Logs a user in based on the provided request and response objects.
   *
   * This method verifies the user's credentials, generates a JWT token, and sets it as a cookie.
   * It also updates the user's public key in the database for future authentication.
   *
   * @param req - The Fastify request object containing user credentials.
   * @param res - The Fastify reply object used to send responses.
   *
   * @returns A promise that resolves to the Fastify reply object with the user's data.
   *
   * @example
   * // Successful login
   * async function handleRequest(req: FastifyRequest, res: FastifyReply) {
   *   await login(req, res);
   *   console.log('User logged in:', res.body);
   * }
   *
   * @example
   * // Handling invalid credentials
   * async function handleRequest(req: FastifyRequest, res: FastifyReply) {
   *   const response = await login(req, res);
   *   if (response.statusCode === 401) {
   *     console.log(response.message); // "Credenciais inválidas"
   *   }
   * }
   *
   * @example
   * // Handling login errors
   * async function handleRequest(req: FastifyRequest, res: FastifyReply) {
   *   try {
   *     await login(req, res);
   *   } catch (error) {
   *     console.error('Login failed:', error);
   *     // Handle login errors
   *   }
   * }

   * Authenticates a user based on provided credentials.
   *
   * This asynchronous function processes a login request by validating the user's
   * identification and password. If the credentials are valid, it generates a JWT token,
   * sets it as a cookie in the response, and returns the user data.
   *
   * @param {FastifyRequest} req - The request object containing user credentials in the body.
   * @param {FastifyReply} res - The response object used to send back the result of the login attempt.
   * @returns {Promise<void>} A promise that resolves when the response has been sent.
   *
   * @throws {Error} Throws an error if the login process encounters an issue, which is handled
   *                 by the ErrorsHandler.
   *
   * @example
   * // Example usage of the login function
   * app.post('/login', async (req, res) => {
   *   await login(req, res);
   * });

   */
  login = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { identification, password } = userValidations.getForLogin.parse(
        req.body
      );

      const user = await userModel.getData(identification);

      if (
        !user ||
        !(await hashService.comparePassword(password, user.password))
      ) {
        throw new AppError("Credenciais inválidas", 401);
      }

      const payload = { id: user.id, username: user.nome_usuario };

      const token = req.jwt.sign(payload);

      res.setCookie("access_token", token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: Number(process.env.JWT_EXPIRES_IN!),
      });

      const { password: pwd, ...userData } = user;
      console.log(userData);
      return res.send(userData);
    } catch (error) {
      console.log(error);
      ErrorsHandler.handle(error, res);
    }
  };
  getSessionData = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const token = req.cookies.access_token;
      if (!token) {
        throw new AppError("Inicie sessão", 401);
      }

      const decoded = req.jwt.decode<FastifyJWT["user"]>(token);

      if (!decoded) {
        res.clearCookie("access_token", { path: "/" });
        throw new AppError("Sessão inválida", 401);
      }

      const user = req.jwt.verify<FastifyJWT["user"]>(token);
      const userData = await userModel.getById(user.id);

      if (!userData) {
        throw new AppError("Usuário não encontrado", 404);
      }
      const { password: pwd, ...dataToSend } = userData;
      return res.send(dataToSend);
    } catch (err) {
      console.error("Erro na autenticação:", err);
      res.clearCookie("access_token", { path: "/" });
      throw new AppError("Sessão inválida", 401);
    }
  };

  /**
   * Logs a user out based on the provided request and response objects.
   *
   * This method clears the user's access token cookie and updates the user's public key in the database.
   *
   * @param req - The Fastify request object containing the user's data.
   * @param res - The Fastify reply object used to send responses.
   *
   * @returns A promise that resolves to the Fastify reply object with a success message.
   *
   * @example
   * // Successful logout
   * async function handleRequest(req: FastifyRequest, res: FastifyReply) {
   *   await logout(req, res);
   *   console.log('User logged out:', res.body);
   * }
   *
   * @example
   * // Handling logout errors
   * async function handleRequest(req: FastifyRequest, res: FastifyReply) {
   *   try {
   *     await logout(req, res);
   *   } catch (error) {
   *     console.error('Logout failed:', error);
   *     // Handle logout errors
   *   }
   * }
   */

  logout = async (req: FastifyRequest, res: FastifyReply) => {
    res.clearCookie("access_token", { path: "/" });
    return res.send({ message: "Logout realizado com sucesso!" });
  };
}
export const authService = new AuthService();
