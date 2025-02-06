import { mailProvider } from "../lib/mail";
import {
  emailAddedNotificationTemplate,
  emailCredentialsTemplate,
} from "../templates/email/credentials";

interface Email {
  email: string;
  password: string;
}

class MailService {
  sendCredentials = async (to: string, data: Email) => {
    await mailProvider.send(
      to,
      emailCredentialsTemplate(data.email, data.password)
    );
  };
  notifyAddedEmail = async (
    to: string,
    { email, name }: { email: string; name: string }
  ) => {
    await mailProvider.send(to, emailAddedNotificationTemplate(email, name));
  };
}

export const mailService = new MailService();
