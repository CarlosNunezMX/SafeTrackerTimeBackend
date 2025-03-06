import { Resend } from "resend";
import type IEmailClient from "../domain/EmailClient";
import type EmailDetails from "../domain/EmailDetails";
import type MailBuilder from "../domain/MailBuilder";
import {html} from "hono/html"
export default class EmailClient implements IEmailClient {
  private transporter: Resend;
  constructor(
    private apiKey: string,
    private apiEmail: string,
  ) {
    this.transporter = new Resend(this.apiKey);
  };


  public async sendEmail<T>(to: EmailDetails, Builder: MailBuilder<T>): Promise<void> {
    await this.transporter.emails.send({
      to: to.sendTo,
      from: `SafeTracker <${this.apiEmail}>`,
      subject: to.subject,
      // TODO: Make it not dependent of mailbuilder
      html: await <Builder.buildMail />
    })
  };
};
