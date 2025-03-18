import { Fragment } from "hono/jsx/jsx-runtime";
import Layout from "./layout";
import { button, card, errorCard, input } from "./styles/common";
import { mainForm } from "./styles/recoverPasswordForm";

interface RecoverPasswordViewProps {
  token?: string,
  error?: string
};


const Form = ({token}: {token: string}) => (
  <Fragment>
    <form action="/api/v1/auth/recover" class={mainForm} method="post">
      <input value={token} id="token" hidden name="token"/>
      <input class={input} required type="password" name="password" id="password" placeholder="Digita tu nueva contraseña" /> 
      <button class={button}>Cambiar contraseña</button>
    </form>
  </Fragment>
)

const Card = ({title, token, error}: {error?:string, title: string, token?: string}) => (
  <Fragment>
      <div className={!!error ? errorCard : card}>
        <h1>{title}</h1>
        {!!error ? <p>{error}</p> : <Form token={token!}/>}
      </div>
  </Fragment> 
)
export default function RecoverPasswordView({error, token}: RecoverPasswordViewProps) {
  return (
    <Layout title="SafeTrack - Recuperar contraseña.">
      <Card 
        title={!!error ? "Hubo un error" : "Recupera tu contraseña"}
        token={token}
        error={error}
      />
    </Layout>

  );
};
