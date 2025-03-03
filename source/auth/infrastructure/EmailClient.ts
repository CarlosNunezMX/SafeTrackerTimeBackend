import { Resend } from "resend";
import type IEmailClient from "../domain/EmailClient";
import type EmailDetails from "../domain/EmailDetails";
import type MailBuilder from "./MailBuilder";
export default class EmailClient implements IEmailClient {
  private transporter: Resend;
  constructor(
    private mailBuilder: typeof MailBuilder,
    private apiKey: string,
    private apiEmail: string,
    private mainURL: string
  ) {
    this.transporter = new Resend(this.apiKey);
  };


  public async sendEmail(details: EmailDetails): Promise<void> {
    await this.transporter.emails.send({
      to: details.sendTo,
      from: `SafeTracker <${this.apiEmail}>`,
      subject: details.subject,
      // TODO: Make it not dependent of mailbuilder
      html: await this.mailBuilder.buildEmail(details, this.mainURL)
    })
  };
};
