import type EmailDetails from "./EmailDetails";
import type MailBuilder from "./MailBuilder";

export default interface IEmailClient {
  sendEmail<T>(to: EmailDetails,  builder: MailBuilder<T>): Promise<void>;
};
