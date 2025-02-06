export const SmsTemplate = (username: string, password: string) => {
  return `Suas credenciais são:
        Nome de usuário: ${username}
        Senha: ${password}.
        (Estes dados podem ser alterados mais tarde)`;
}
