import type EmailDetails from "./EmailDetails";

export default interface IEmailClient {
  sendEmail(details: EmailDetails): Promise<void>;
};
