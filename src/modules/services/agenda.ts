import { agendaModel } from "../models/agenda";
import { BaseService } from "./base";
import { agendaValidations } from "../validations/agenda";

class AgendaService extends BaseService {
  model = agendaModel;
  queryValidation = agendaValidations.getQueryData;
}

export const agendaService = new AgendaService();
