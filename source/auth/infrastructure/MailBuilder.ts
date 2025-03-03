import type EmailDetails from "../domain/EmailDetails";

export default class MailBuilder {
  static async buildEmail(details: EmailDetails, mainURL: string): Promise<string> {
    return `
  <style>
  #mailBody {display: flex;flex-direction: column;align-items: center;justify-content: center;font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;padding: 5dvh 10dvw;}
  button {background-color: rgb(4, 106, 100); color: white; border: none; border-radius: 5px; padding: 2dvh 3dvw;}
  .box p {text-align: center;}
  .box {margin: 2dvw auto;}
  </style>
  <div id="mailBody">
    <h1>Safe Track</h1>
    <div class="box">
    <p>Gracias por su registro en nuestra app!</p>
      <p>Le enviamos este correo para verificar la cuenta de <b>${details.name}</b></p>
    </div>
    <a href="${mainURL}/api/v1/auth/verify?token=${details.token}"><button>Verificar mi correo</button></a>
  </div>
  `
  }
};



