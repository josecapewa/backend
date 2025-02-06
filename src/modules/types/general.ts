import { JWT } from "@fastify/jwt";
import { $Enums, Prisma, Usuario } from "@prisma/client";

type UserPayload = {
  id: string;
  username: string;
  loged_at: string;
};

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: UserPayload;
  }
}
declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
}
export type EmailReturn = {
  suspended_incoming: string,
  suspended_login: string,
  login: string,
  email: string
}
export type User = Usuario & {
  nivel: {
    id: string;
    nome: string;
    descricao: string;
    permissoes_telas: {
      id: string;
      id_tela: string;
      id_nivel: string;
      tela: {
        id: string;
        nome: string;
        caminho: string;
        descricao: string;
      };
      permissao: $Enums.Permissao;
    }[];
  };
  permissoes_adicionais: {
    id: string;
    id_usuario: string;
    id_permissao: string;
    permissao: $Enums.Permissao;
    tela: {
      id: string;
      nome: string;
      caminho: string;
      descricao: string;
    };
  }[];
};
