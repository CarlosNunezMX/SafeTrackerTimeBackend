import { Resend } from "resend";
import type IEmailClient from "../domain/EmailClient";
import type EmailDetails from "../domain/EmailDetails";
import type MailBuilder from "../domain/MailBuilder";
import UnknownError from "../../shared/domain/UnknownError";
export default class EmailClient implements IEmailClient {
  private transporter: Resend;
  constructor(
    private apiKey: string,
    private apiEmail: string,
  ) {
    this.transporter = new Resend(this.apiKey);
  };


  public async sendEmail<T>(to: EmailDetails, Builder: MailBuilder<T>): Promise<void> {
    const Element = Builder.buildMail.bind(Builder);
    const emailID = await this.transporter.emails.send({
      to: to.sendTo,
      from: `SafeTracker <${this.apiEmail}>`,
      subject: to.subject,
      // TODO: Make it not dependent of mailbuilder
      html: (await <Element />).toString()
    })
    if (emailID.error) {
      console.error(emailID.error)
      throw new UnknownError("El email no se pudo enviar");
    }
  };
};
