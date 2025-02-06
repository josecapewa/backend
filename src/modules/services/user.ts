import { FastifyReply, FastifyRequest } from "fastify";
import { userValidations } from "../validations/user";
import { userModel } from "../models/user";
import { personModel } from "../models/person";
import { BaseService } from "./base";
import { sendSms } from "./sms";
import { SmsTemplate } from "../templates/sms";
import { hashService } from "./hash";
import { phoneModel } from "../models/phone";
import { screenPermissionModel } from "../models/screen_permission";
import { ParamsValidations } from "../validations/params";
import { AppError } from "../errors/app";
import { getFieldsAndFiles } from "../helpers/multipart/get_fields_and_files";
import { MultipartBody } from "../types/multipart";
import { fileManagementService } from "./file-management";
import { mailService } from "./mail";
import { generateUsername } from "../lib/utils";

class UserService extends BaseService {
  model = userModel;
  createValidationSchema = userValidations.getData;
  updateValidationSchema = userValidations.getDataToUpdate;

  create = async (req: FastifyRequest, res: FastifyReply) => {
    const {
      genero,
      nome,
      nome_usuario,
      permissoes_telas,
      telefone,
      is_master,
    } = userValidations.getData.parse(req.body);

    if (!is_master && (!permissoes_telas || permissoes_telas.length == 0)) {
      throw new AppError("Introduza pelo menos uma permissão", 400);
    }

    const pessoa = await personModel.simpleCreate({
      genero,
      nome: nome.toUpperCase(),
    });

    await phoneModel.create({
      id_pessoa: pessoa.id,
      numero: telefone,
      observacao: null,
    });

    const password = await hashService.generatePassword();

    await sendSms(telefone, SmsTemplate(nome_usuario, password));

    const hashedPassword = await hashService.hashPassword(password);
    if (await userModel.userExists(nome_usuario)) {
      throw new AppError("Nome de usuário já cadastrado", 400);
    }
    const user = await userModel.create({
      id_pessoa: pessoa.id,
      nome_usuario,
      password: hashedPassword,
      is_master,
      foto: null,
    });

    if (permissoes_telas) {
      await screenPermissionModel.createMany(
        permissoes_telas.map((permission) => ({
          ...permission,
          id_usuario: user.id,
        }))
      );
    }
    return res.send({ ...user, password });
  };
  update = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = ParamsValidations.getId.parse(req.params);
    const dataToUpdate = userValidations.getDataToUpdate.parse(req.body);

    const updatedUser = await userModel.updateWithPermissions(id, dataToUpdate);

    return res.send(updatedUser);
  };
  assignPerson = async (req: FastifyRequest, res: FastifyReply) => {
    const { id_pessoa, telefone } = userValidations.getAssignUserData.parse(
      req.body
    );
    const personData = await personModel.getDefaultData(id_pessoa);
    if (!personData) {
      throw new AppError("Pessoa não encontrada", 404);
    }
    const { email } = personData;
    const password = await hashService.generatePassword();
    const hashedPassword = await hashService.hashPassword(password);
    const username = await generateUsername(personData.nome);
    const user = await userModel.create({
      id_pessoa,
      nome_usuario: username,
      password: hashedPassword,
      is_master: false,
      foto: null,
    });
    await phoneModel.create({
      id_pessoa,
      numero: telefone,
      observacao: null,
    });

    const execs: Promise<unknown>[] = [
      sendSms(telefone, SmsTemplate(username, password)),
    ];
    if (email) {
      execs.push(
        mailService.sendCredentials(email.email, {
          email: email?.email,
          password,
        })
      );
    }
    await Promise.all(execs);

    const { password: pwd, ...userData } = user;
    return res.send(userData);
  };
  simpleUpdate = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = ParamsValidations.getId.parse(req.params);
    const { fields, files } = await getFieldsAndFiles(
      req.body as MultipartBody
    );

    let imagePath = undefined;
    let newPassword = undefined;

    const foto = files.foto;
    if (foto) {
      imagePath = await fileManagementService.upload({
        part: foto,
        directory: "USUARIOS/FOTOS",
      });
    }
    const dataToUpdate = userValidations.getSimpleDataToUpdate.parse(fields);
    const { email, password } = dataToUpdate;
    if (password) {
      newPassword = await hashService.hashPassword(password);
    }
    const updatedUser = await userModel.simpleUpdate(id, {
      ...dataToUpdate,
      password: newPassword,
      foto: imagePath,
    });

    if (email) {
      mailService.notifyAddedEmail(email, {
        email: email,
        name: updatedUser.pessoa.nome,
      });
    }

    return res.send(updatedUser);
  };
}

export const userService = new UserService();
