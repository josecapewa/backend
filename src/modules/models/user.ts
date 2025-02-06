import { Usuario, Prisma } from "@prisma/client";
import prisma from "../lib/prisma";
import { BaseModel, TBaseGetAllParams } from "./base";

const userIncludes = {
  cartao_usuario: true,
  trocas: {
    include: {
      referencia: true,
    },
  },
} as Prisma.UsuarioInclude;

class UserModel extends BaseModel<Usuario> {
  model = prisma.usuario;
  include = userIncludes;

  create = async (data: Omit<Usuario, "id" | "tipo" | "foto" | "pontos">) => {
    return await this.model.create({ data, include: this.include });
  };

  getAll = async ({ skip, take, filter }: TBaseGetAllParams) => {
    this.getAllWherClause = {
      OR: [
        {
          nome: {
            contains: filter,
          },
        },
        {
          email: {
            contains: filter,
          },
        },
      ],
    } as Prisma.UsuarioWhereInput;

    return await this.model.findMany({
      include: this.include,
      skip,
      take,
      where: this.getAllWherClause,
    });
  };

  getByEmail = async (email: string) => {
    return await prisma.usuario.findFirst({
      where: { email },
      include: this.include,
    });
  };
}

export const userModel = new UserModel();
