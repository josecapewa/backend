import z from "zod";
import { nonEmptyString } from ".";

class CardValidation {
    getData = z.object({
        numero: nonEmptyString("O código do cartão é obrigatório"),
    });

    getDataToUpdate = this.getData.partial();
}

export const cardValidations = new CardValidation();