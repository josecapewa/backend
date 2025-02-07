import { FastifyReply, FastifyRequest } from "fastify";
import { userValidations } from "../validations/user";
import { userModel } from "../models/user";
import { BaseService } from "./base";
import { hashService } from "./hash";
import { ParamsValidations } from "../validations/params";
import { AppError } from "../errors/app";

class UserService extends BaseService {
  model = userModel;
  createValidationSchema = userValidations.getData;
  updateValidationSchema = userValidations.getDataToUpdate;

  create = async (req: FastifyRequest, res: FastifyReply) => {
    const userData = userValidations.getData.parse(req.body);

    const hashedPassword = await hashService.hashPassword(userData.senha);
    if (await userModel.getByEmail(userData.email)) {
      throw new AppError("Email já em uso na plataforma.", 400);
    }

    const user = await userModel.create({
      ...userData,
      email_recuperacao: userData.email_recuperacao ?? userData.email,
      senha: hashedPassword,
    });

    return res.send(user);
  };
  update = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = ParamsValidations.getId.parse(req.params);
    const dataToUpdate = userValidations.getDataToUpdate.parse(req.body);

    if (dataToUpdate.senha) {
      dataToUpdate.senha = await hashService.hashPassword(dataToUpdate?.senha);
    }

    const updatedUser = await userModel.update(id, dataToUpdate);

    return res.send(updatedUser);
  };
}

export const userService = new UserService();
