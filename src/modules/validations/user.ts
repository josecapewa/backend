import z from "zod";
import { angolanPhoneSchema, nonEmptyString, permissionSchema } from ".";

class UserValidations {
  getData = z.object({
    nome_usuario: nonEmptyString("Introduza o nome de usuário"),
    is_master: z.coerce.boolean(),
    nome: nonEmptyString("Introduza o nome"),
    genero: z.coerce.boolean({ required_error: "Seleccione o gênero" }),
    telefone: angolanPhoneSchema,
    email: z.string().email("Introduza um email válido").optional(),
    permissoes_telas: z.array(permissionSchema).optional(),
  });
  getSimpleDataToUpdate = z.object({
    nome_usuario: z.string().optional(),
    telefone: angolanPhoneSchema.optional(),
    password: z
      .string()
      .min(6, "A senha deve possuir no mínimo 6 caracteres")
      .optional(),
    email: z.string().email("Introduza um email válido").optional(),
  });
  getDataToUpdate = this.getData.partial();

  getForLogin = z.object({
    identification: z.string(),
    password: z.string().min(8, "A senha deve possuir no mínimo 8 caracteres"),
  });
  getAssignUserData = z.object({
    id_pessoa: z.string(),
    telefone: angolanPhoneSchema,
  });
}

export const userValidations = new UserValidations();
