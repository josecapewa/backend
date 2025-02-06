import nodemailer from "nodemailer";

export class MailProvider {
  async send(to: string, html: string) {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isEmail.test(to)) {
      const transporter = nodemailer.createTransport({
        host: "mail.ipil.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: "Portal do IPIL",
        html,
      };
      try {
        await transporter.sendMail(mailOptions);
      } catch (error) {
        throw new Error(`${error}`);
      }
    } else {
      throw new Error("Forneça um email válido");
    }
  }
}

export const mailProvider = new MailProvider();