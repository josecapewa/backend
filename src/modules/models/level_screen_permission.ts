import { NivelPermissaoTela } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

class LevelScreenPermissionModel extends BaseModel<NivelPermissaoTela> {
  model = prisma.nivelPermissaoTela;

  createMany = async (data: Omit<NivelPermissaoTela, "id">[]) => {
    return await this.model.createMany({ data });
  };
}

export const levelScreenPermissionModel = new LevelScreenPermissionModel();
