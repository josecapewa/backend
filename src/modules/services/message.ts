import { FastifyReply, FastifyRequest } from "fastify";
import { messageModel } from "../models/message";
import { messageValidations } from "../validations/message";
import { BaseService } from "./base";
import { sendSms } from "./sms";
import { phoneModel } from "../models/phone";
import { personModel } from "../models/person";
import { AppError } from "../errors/app";

class MessageService extends BaseService {
  model = messageModel;
  createValidationSchema = messageValidations.getData;
  updateValidationSchema = messageValidations.getDataToUpdate;

  create = async (req: FastifyRequest, res: FastifyReply) => {
    const data = messageValidations.getData.parse(req.body);

    const pessoasNaoEncontradas: string[] = [];
    const pessoasSemTelefone: string[] = [];

    await Promise.all(
      data.destinatarios.map(async (person) => {
        const pessoa = await personModel.getByName(person.nome);
        
        if (!pessoa) {
          pessoasNaoEncontradas.push(person.nome);
          return;
        }
        if (!pessoa.telefone) {
          pessoasSemTelefone.push(person.nome);
          return;
        }

        await this.model.create({
          texto: data.texto,
          id_telefone: pessoa.telefone.id,
        });

        const telefone = await phoneModel.getById(pessoa.telefone.id);
        if (telefone) {
          await sendSms(telefone.numero, data.texto);
        }
      })
    );

    const errorMessages: string[] = [];

    if (pessoasNaoEncontradas.length > 0) {
      errorMessages.push(
        `As seguintes pessoas não foram encontradas: ${pessoasNaoEncontradas.join(", ")}.`
      );
    }

    if (pessoasSemTelefone.length > 0) {
      errorMessages.push(
        `As seguintes pessoas não possuem telefone cadastrado: ${pessoasSemTelefone.join(", ")}.`
      );
    }

    if (errorMessages.length > 0) {
      throw new AppError(errorMessages.join(". "), 400); 
    }

    return res.send({ success: true });
  };
}

export const messageService = new MessageService();
