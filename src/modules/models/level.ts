import { BaseModel } from "./base";
import prisma from "../lib/prisma";
import { Nivel, Prisma } from "@prisma/client";

type LevelDataToUpdateWithPermissions = {
  permissoes_telas?:
    | {
        permissao: "VISUALISAR" | "CRIAR" | "EDITAR" | "ELIMINAR";
        caminho_tela: string;
      }[]
    | undefined;
  nome?: string | undefined;
  descricao?: string | undefined;
};
class LevelModel extends BaseModel<Nivel> {
  model = prisma.nivel;
  include = { permissoes_telas: true } as Prisma.NivelInclude;

  updateWithPermissions = async (
    id: string,
    data: LevelDataToUpdateWithPermissions
  ) => {
    return await prisma.nivel.update({
      where: { id },
      data: {
        ...data,
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

export const levelModel = new LevelModel();
