import MailBuilder from "../domain/MailBuilder";

export interface IValidateEmailProps {
  name: string;
  url: string;
  token: string;
};

export default class ValidateEmailBuilder extends MailBuilder<IValidateEmailProps> {
  constructor(props: IValidateEmailProps) {
    super(props);
  }
  private getURL(){
    return `${this.info.url}/api/v1/auth/verify?token=${this.info.token}`;
  };

  public buildMail() {
    return (
      <div>
        <h1>Safe Track</h1>
        <p>Gracias por su registro en nuestra app!</p>
        <p>Le enviamos este correo para verificar la cuenta de <b>{this.info.name}</b></p>
        <a href={this.getURL()}>
          <button>
            Verifica tu email
          </button>
        </a>

        <b>Si no se verifica su email en 5 días, su cuenta se desactivara, en tal caso deberá contactarse con los administradores</b>
      </div>
    );
  }

};



