import { Fragment } from "hono/jsx/jsx-runtime";
import Layout from "./layout";
import { card, errorCard } from "./styles/common";

export default function ChangedPasswordView({ error }: { error?: string }) {
    return (
        <Layout title="SafeTrack - Contraseña cambiada">
            <Fragment>
                <div class={!!error ? errorCard : card}>
                    <h1>{error ? "Hubo un error" : "Tu contraseña fue cambiada"}</h1>
                    <p>{error ? error : "Su contraseña fue cambiada, gracias!"}</p>
                </div>
            </Fragment>
        </Layout>
    )
};