import { Fragment } from "hono/jsx";
import type User from "../user/domain/user";
import { css, keyframes, Style } from "hono/css";

interface EmailVerifiedViewProps {
  user: User,
  error: string
};


const ani = keyframes`
  from {
    --angle: 0deg;
  }
  to {
    --angle: 360deg;
  }
`

const cardPseudo = css`
&::after, &::before{
  width: 100%;
  height: 100%;
  content: ' ';
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  z-index: -1;
  padding: 5px;
  border-radius: 10px;
  animation-name: ${ani};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  background-image: conic-gradient(from var(--angle), #28af43, #108827, #057b1e,#007519,#28af43);
}
`
const cardBefore = css`
&::before {
  filter: blur(1.5em);
  opacity: 0.5;
}
`




const card = css`
  width: 30dvw;
  background-color: #030303;
  padding: 2em;
  text-align: center;
  border-radius: 10px;
  margin: 25dvh auto;
  position: relative;
  ${cardPseudo}
  ${cardBefore}
`

const badCard = css`
  ${card}
  &::before, &::after {
    background-image: conic-gradient(from var(--angle), #F1959B, #DC1C13, #EA4C46, #F07470, #F1959B);
  }
`

const body = css`
:-hono-global {

  @property --angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }
  body {  
    background-color: rgb(16, 16, 16);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: white;
  }
};
`

function OkText({ email }: { email: string }) {
  return (
    <div class={card}>
      <h1>Correo Verificado</h1>
      <p>Usted verificó el correo <b>{email}</b></p>
      <p>Puede cerrar esta ventana e iniciar sesión en la app</p>
    </div>
  );
};

function BadCard({ error }: { error: string }) {
  return (
    <div class={badCard}>
      <h1>Hubo un error</h1>
      <p>{error}</p>
    </div>
  )
};

export default function VerfiedView({ user, error }: Partial<EmailVerifiedViewProps>) {
  return (
    <Fragment>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Safe Track Verification</title>
          <Style />
        </head>
        <body class={body}>
          {error ? <BadCard error={error} /> : <OkText email={user!.email} />}
        </body>
      </html >
    </Fragment >
  )
};
