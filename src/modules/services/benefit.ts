import { benefitModel } from "../models/benefit";
import { benefitValidations } from "../validations/benefit";
import { BaseService } from "./base";

class BenefitService extends BaseService {
  model = benefitModel;
  createValidationSchema = benefitValidations.getData;
  updateValidationSchema = benefitValidations.getDataToUpdate;
}

export const benefitService = new BenefitService();