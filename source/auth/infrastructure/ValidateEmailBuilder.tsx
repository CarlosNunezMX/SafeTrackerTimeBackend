import MailBuilder from "../domain/MailBuilder";

interface IValidateEmailProps {
  name: string;
  url: string;
};

export default class ValidateEmailBuilder extends MailBuilder<IValidateEmailProps> {
  constructor(props: IValidateEmailProps) {
    super(props);
  }

  public buildMail() {
    return (
      <div>
        <h1>Safe Track</h1>
        <p>Gracias por su registro en nuestra app!</p>
        <p>Le enviamos este correo para verificar la cuenta de <b>{this.info.name}</b></p>
        <a href={this.info.url}>
          <button>
            Verifica tu email
          </button>
        </a>

        <b>Si no se verifica su email en 5 días, su cuenta se desactivara, en tal caso deberá contactarse con los administradores</b>
      </div>
    );
  }

};



