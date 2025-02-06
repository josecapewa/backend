/**
 * Tipagem para os parâmetros das requisições da API do cPanel.
 * Permite apenas valores de tipos primitivos esperados.
 */
type RequestParams = Record<string, string | number | boolean>;

/**
 * Interface base para as respostas da API do cPanel.
 */
interface CpanelResponse {
  /** Indica o status da operação: `1` para sucesso, `0` para falha. */
  status: number;
  /** Lista de erros retornados pela API (caso existam). */
  errors?: string[];
}

/**
 * Representa uma conta de e-mail no cPanel.
 */
interface EmailAccount {
  /** Endereço de e-mail completo (exemplo: `usuario@dominio.com`). */
  email: string;
  /** Nome do domínio ao qual o e-mail pertence. */
  domain: string;
  /** Espaço utilizado pela conta em MB. */
  diskused: string;
  /** Espaço máximo permitido para a conta em MB. */
  diskquota: string;
  /** Indica se o login da conta está suspenso (`1` = sim, `0` = não). */
  suspended_login: number;
  /** Indica se o recebimento de e-mails está suspenso (`1` = sim, `0` = não). */
  suspended_incoming: number;
  /** Indica se o envio de e-mails está suspenso (`1` = sim, `0` = não). */
  suspended_outgoing: number;
}

/**
 * Interface para a resposta da API ao listar contas de e-mail.
 */
interface EmailListResponse extends CpanelResponse {
  /** Lista de contas de e-mail existentes no domínio. */
  data: EmailAccount[];
}
