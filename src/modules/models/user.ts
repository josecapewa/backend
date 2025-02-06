import { Usuario, Prisma } from "@prisma/client";
import prisma from "../lib/prisma";
import { BaseModel, TBaseGetAllParams } from "./base";

type UserDataToUpdateWithPermissions = {
  permissoes_telas?: {
    permissao: "VISUALISAR" | "CRIAR" | "EDITAR" | "ELIMINAR";
    caminho_tela: string;
  }[];
  is_master?: boolean;
  nome?: string;
  nome_usuario?: string;
  genero?: boolean;
};

const userIncludes = {
  pessoa: {
    include: {
      telefone: true,
      email: true,
      aluno: {
        include: {
          encarregado: true,
        },
      },
    },
  },
  permissoes_telas: true,
} as Prisma.UsuarioInclude;

class UserModel extends BaseModel<Usuario> {
  model = prisma.usuario;
  include = userIncludes;

  getAll = async ({ skip, take, filter }: TBaseGetAllParams) => {
    this.getAllWherClause = {
      nome_usuario: { contains: filter },
      pessoa: {
        nome: { contains: filter },
      },
    } as Prisma.UsuarioWhereInput;

    return await this.model.findMany({
      include: this.include,
      skip,
      take,
      where: this.getAllWherClause,
    });
  };

  create = async (data: Omit<Usuario, "id">) => {
    return await this.model.create({ data, include: this.include });
  };
  simpleUpdate = async (
    id: string,
    {
      nome_usuario,
      email,
      foto,
      password,
      telefone,
    }: Partial<Usuario & { telefone?: string; email?: string; foto?: string }>
  ) => {
    return await this.model.update({
      where: { id },
      data: {
        nome_usuario: nome_usuario,
        password: password,
        foto: foto,
        pessoa: {
          update: {
            telefone: {
              update: {
                numero: telefone,
              },
            },
            email: email
              ? {
                  upsert: {
                    create: {
                      email: email,
                    },
                    update: {
                      email: email,
                    },
                  },
                }
              : undefined,
          },
        },
      },
      include: this.include,
    });
  };

  getData = async (identification: string) => {
    return await prisma.usuario.findFirst({
      where: {
        OR: [
          { nome_usuario: identification },
          { pessoa: { identificacao: { numero: identification } } },
          { pessoa: { email: { email: identification } } },
        ],
      },
      include: this.include,
    });
  };

  userExists = async (field: string): Promise<boolean> => {
    const user = await prisma.usuario.findFirst({
      where: {
        OR: [{ nome_usuario: field }, { id_pessoa: field }],
      },
      include: this.include,
    });
    return !!user;
  };
  updateWithPermissions = async (
    id: string,
    data: UserDataToUpdateWithPermissions
  ) => {
    return await prisma.usuario.update({
      where: { id },
      data: {
        nome_usuario: data.nome_usuario,
        is_master: data.is_master,
        pessoa: {
          update: {
            nome: data.nome,
          },
        },
        permissoes_telas: data.permissoes_telas
          ? {
              deleteMany: {},
              createMany: {
                data: data.permissoes_telas,
              },
            }
          : undefined,
      },
    });
  };
}

export const userModel = new UserModel();
