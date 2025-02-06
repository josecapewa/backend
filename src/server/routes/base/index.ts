import { FastifyInstance } from "fastify";
import {
  IService,
  Request,
  ImporServices,
  StatiscsService,
  relation,
} from "../../../modules/types/service";

export class BaseRoute {
  static async handle(
    app: FastifyInstance,
    service: IService,
    routeBaseName: string
  ) {
    app.get(`/${routeBaseName}/simple`, service.getAllWithoutIncludes.bind(service));
    app.get(`/${routeBaseName}`, service.getAll.bind(service));
    app.get(`/${routeBaseName}/:id`, service.getById.bind(service));
    app.post(`/${routeBaseName}`, service.create.bind(service));
    app.put(`/${routeBaseName}/:id`, service.update.bind(service));
    app.delete(`/${routeBaseName}/:id`, service.delete.bind(service));
  }
  static async relation(app: FastifyInstance, service: relation, routeBaseName: string){
    app.post(`/${routeBaseName}`, service.create);
    app.get(`/${routeBaseName}/disciplina`, service.getDisciplineClass)
  }
  static async import(app: FastifyInstance, service: ImporServices, routeBaseName: string) {
    
  }
  static async statiscs(app: FastifyInstance, service: StatiscsService, routeBaseName: string) {
    app.get(`/${routeBaseName}/estatistica`, service.getAll);
  }
}


export async function Request(
  app: FastifyInstance,
  service: Request,
  routeBaseName: string
) {
  app.post(`/${routeBaseName}`, service.create);
  app.get(`/${routeBaseName}/select`, service.getAll);
  app.get(`/${routeBaseName}/count`, service.countRequest);
}
