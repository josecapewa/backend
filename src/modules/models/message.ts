import { Mensagem, Prisma } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

const messageInclude = {
  telefone: {
    include: {
      pessoa: true,
    },
  },
} as Prisma.MensagemInclude;

class MessageModel extends BaseModel<Mensagem> {
  protected model = prisma.mensagem;
  protected include = messageInclude;

}

export const messageModel = new MessageModel();
