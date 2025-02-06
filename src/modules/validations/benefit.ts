import z from "zod";
import { nonEmptyString } from ".";

class BenefitValidation {
    getData = z.object({
        nome: nonEmptyString("O nome do benefício é obrigatório"),
        descricao: nonEmptyString("A descrição do benefício é obrigatória"),
        pontos: z.number().int().positive("A quantidade de pontos necessários deve ser um número positivo"),
        id_categoria: nonEmptyString("A categoria do benefício é obrigatória"),
    });

    getDataToUpdate = this.getData.partial();
}

export const benefitValidations = new BenefitValidation();