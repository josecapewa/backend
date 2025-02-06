import z from "zod";
import { nonEmptyString } from ".";

class CategoryValidation {
  getData = z.object({
    nome: nonEmptyString("O nome da categoria deve ter no mínimo 3 caracteres"),
    descricao: nonEmptyString("A descrição da categoria é obrigatória"),
  });

  getDataToUpdate = this.getData.partial();
}

export const categoryValidations = new CategoryValidation();
