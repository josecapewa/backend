import { FastifyReply, FastifyRequest } from "fastify";
import { BaseService } from "../services/base";
export interface IService extends BaseService {}
export interface ImporServices {
  create: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
  //getAll: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
}
export interface relation {
  create: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
  getDisciplineClass: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
}
export interface StatiscsService{
  getAll: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
}
export interface Request {
  create: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
  getAll: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
  countRequest: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
}
