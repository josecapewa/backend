import z from "zod";
import { angolanPhoneSchema, nonEmptyString, permissionSchema } from ".";

class UserValidations {
  getData = z.object({
    nome: nonEmptyString("Introduza o nome"),
    telefone: angolanPhoneSchema,
    email: nonEmptyString().email("Introduza um email válido"),
    email_recuperacao: z.string().email("Introduza um email válido").optional(),
    senha: nonEmptyString("Introduza a senha"),
  });
  getDataToUpdate = this.getData.partial();

  getForLogin = z.object({
    identification: z.string(),
    password: z.string().min(8, "A senha deve possuir no mínimo 8 caracteres"),
  });
}

export const userValidations = new UserValidations();
