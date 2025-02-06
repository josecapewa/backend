import { cardModel } from "../models/card";
import { cardValidations } from "../validations/card";
import { BaseService } from "./base";

class CardService extends BaseService{
    model = cardModel ;
    createValidationSchema = cardValidations.getData;
    updateValidationSchema = cardValidations.getDataToUpdate;
}

export const cardService = new CardService();