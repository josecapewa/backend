import { FastifyRequest, FastifyReply } from "fastify";
import { ZodSchema } from "zod";
import { ErrorsHandler } from "../../errors/handler";
import { ParamsValidations } from "../../validations/params";
import { QueryValidations } from "@/modules/validations/query";
import { BaseModel } from "@/modules/models/base";

export abstract class BaseService {
  protected abstract model: BaseModel<any>;
  protected createValidationSchema?: ZodSchema;
  protected updateValidationSchema?: ZodSchema;
  queryValidation: ZodSchema = QueryValidations.getData;

  create = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const data = this.createValidationSchema?.parse(req.body);

      const item = await this.model.create(data);
      return res.status(201).send(item);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  };

  getAllWithoutIncludes = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      // Extraindo parâmetros de paginação e filtro
      const { filter, limit, page, ...rest } = this.queryValidation.parse(
        req.query
      );

      let take = undefined;
      let skip = undefined;
      if (page && limit) {
        take = parseInt(limit);
        skip = take * (parseInt(page) - 1);
      }

      // Chama o método `getAllWithoutIncludes` com os parâmetros necessários
      const items = await this.model.getAllWithoutIncludes({
        take,
        skip,
        filter,
        ...rest,
      });

      return res.send(items);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  };

  getAll = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { limit, page, filter, ...rest } = this.queryValidation.parse(
        req.query
      );
      console.log({ limit, page, filter, ...rest });
      let take = undefined;
      let skip = undefined;
      if (page && limit) {
        take = parseInt(limit);
        skip = take * (parseInt(page) - 1);
      }
      const items = await this.model.getAll({ take, skip, filter, ...rest });
      const totalItems = await this.model.count();
      const totalPages = take ? Math.ceil(totalItems / take) : 1;
      const currentPage = page ? parseInt(page) : 1;

      const data: DataPage<typeof items> = {
        data: items,
        info: {
          totalItems,
          totalPages,
          currentPage,
        },
      };

      return res.send(data);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  };

  getById = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { id } = ParamsValidations.getId.parse(req.params);
      const item = await this.model.getById(id);
      return res.send(item);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  };

  update = async (req: FastifyRequest, res: FastifyReply) => {
    console.log("UPDATE", req.body);
    try {
      const { id } = ParamsValidations.getId.parse(req.params);

      const dataToUpdate = this.updateValidationSchema?.parse(req.body);

      const updatedItem = await this.model.update(id, dataToUpdate);
      return res.send(updatedItem);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  };

  delete = async (req: FastifyRequest, res: FastifyReply) =>  {
    try {
      const { id } = ParamsValidations.getId.parse(req.params);
      const deletedItem = await this.model.delete(id);
      return res.send(deletedItem);
    } catch (error) {
      ErrorsHandler.handle(error, res);
    }
  };
}
