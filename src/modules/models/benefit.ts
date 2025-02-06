import { Beneficio, Prisma } from "@prisma/client";
import prisma from "../lib/prisma";
import { BaseModel } from "./base";

const benefitInclude = {
  categoria: true,
  referencias: true,
} as Prisma.BeneficioInclude;

class BenefitModel extends BaseModel<Beneficio> {
  model = prisma.beneficio;
  include = benefitInclude;
  orderBy = {
    created_at: "desc",
  };
}

export const benefitModel = new BenefitModel();
