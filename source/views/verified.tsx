import { Fragment } from "hono/jsx";
import type User from "../user/domain/user";
import { css, keyframes, Style } from "hono/css";
import Layout from "./layout";
import { card, errorCard } from "./styles/common";

interface EmailVerifiedViewProps {
  user: User,
  error: string
};





function Card({ email }: { email: string }) {
  return (
    <div class={card}>
      <h1>Correo Verificado</h1>
      <p>Usted verificó el correo <b>{email}</b></p>
      <p>Puede cerrar esta ventana e iniciar sesión en la app</p>
    </div>
  );
};

function ErrorCard({ error }: { error: string }) {
  return (
    <div class={errorCard}>
      <h1>Hubo un error</h1>
      <p>{error}</p>
    </div>
  )
};

export default function VerfiedView({ user, error }: Partial<EmailVerifiedViewProps>) {
  return (
  <Layout title="SafeTrack Verificación">
          {error ? <ErrorCard error={error} /> : <Card email={user!.email} />}
  </Layout>
      )
};
