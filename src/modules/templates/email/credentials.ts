/**
 * Gera um template HTML para envio de credenciais por e-mail.
 * @param {string} email - O e-mail criado para o usuário.
 * @param {string} senha - A senha gerada para o acesso.
 * @returns {string} Template HTML formatado para envio de credenciais.
 */
export const emailCredentialsTemplate = (
  email: string,
  senha: string
): string => {
  return `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #333;">
            <h1 style="text-align: center; color: #D96F32;">Portal Ipil</h1>
            <h2 style="text-align: center;">Suas Credenciais de Acesso</h2>
            <p style="text-align: center; font-size: 16px;">
                Seu email foi criada com sucesso! Aqui estão suas credenciais:
            </p>
            <div style="
                background-color: #f4f4f4;
                padding: 15px;
                border-radius: 5px;
                text-align: center;
                font-size: 18px;
                margin: 20px 0;
            ">
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Senha:</strong> ${senha}</p>
            </div>
            <p style="text-align: center; font-size: 14px; color: #777;">
                Recomendamos que você altere sua senha após o primeiro login.
            </p>
        </div>
    `;
};

/**
 * Gera um template HTML para notificar que um e-mail foi adicionado à conta no Portal do Ipil.
 * @param {string} email - O e-mail adicionado à conta do usuário.
 * @returns {string} Template HTML formatado para notificação de e-mail adicionado.
 */
export const emailAddedNotificationTemplate = (
  email: string,
  name: string
): string => {
  return `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #333;">
              <h1 style="text-align: center; color: #D96F32;">Portal Ipil</h1>
              <h2 style="text-align: center;">E-mail Adicionado à Conta</h2>
              <p style="font-size: 16px; text-align: center;">
                  Informamos que o seguinte e-mail foi adicionado à sua conta no <strong>Portal do Ipil</strong>:
              </p>
              <div style="
                  background-color: #f4f4f4;
                  padding: 15px;
                  border-radius: 5px;
                  text-align: center;
                  font-size: 18px;
                  margin: 20px 0;
              ">
                  <p><strong>E-mail:</strong> ${email}</p>
                  <p><strong>Nome do proprietário da conta:</strong> ${name}</p>
                  <p><strong>Data:</strong> ${new Date().toLocaleDateString()}</p>
              </div>
              <p style="font-size: 14px; color: #777; text-align: center;">
                  Caso você não tenha realizado esta ação, entre em contato com o suporte imediatamente.
              </p>
              <p style="font-size: 14px; text-align: center; margin-top: 20px; color: #555;">
                  Obrigado por utilizar o Portal do Ipil.
              </p>
          </div>
      `;
};
