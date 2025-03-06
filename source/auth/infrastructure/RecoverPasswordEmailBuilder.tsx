import type { JSX } from "hono/jsx/jsx-runtime";
import MailBuilder from "../domain/MailBuilder";

export interface IResetPasswordProps {
  token: string,
  name: string,
  url: string
};

export class RecoverPasswordEmailBuilder extends MailBuilder<IResetPasswordProps> {
  constructor(props: IResetPasswordProps) {
    super(props);
  };

  private getURL() {
    return `${this.info.url}/api/v1/auth/recover?token=${this.info.token}`;
  };

  public buildMail(): JSX.Element {
    return (
      <div>
        <h1>Safe Track</h1>
        <p>Hola, {this.info.name}</p>
        <p>Le enviamos este correo por que se solicito un enlace de recuperación de contraseña.</p>
        <a href={this.getURL()}>
          <button>Recupera tu contraseña.</button>
        </a>
      </div>
    )
  }
};
