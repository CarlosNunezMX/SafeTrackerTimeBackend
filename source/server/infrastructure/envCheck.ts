// Add variables
type envars = "TOKEN_SECRET" |
  "DATABASE_URL" |
  "HOST" |
  "RESEND_API_KEY" |
  "RESEND_DOMAIN" |
  "LOCATION_KEY"

// Require variables
const variables: envars[] = [
  "TOKEN_SECRET",
  "DATABASE_URL",
  "HOST",
  "RESEND_API_KEY",
  "RESEND_DOMAIN",
  "LOCATION_KEY"
]

export default function CheckEnviroment() {
  for (let key of variables) {
    if (!process.env[key]) {
      throw new Error("No se encontró la variable de entorno " + key);
    }
  }
};

export class Env {
  // @ts-ignore
  public static variables: Record<envars, any> = {};
  public static loadEnv() {
    for (let variable of variables)
      this.variables[variable] = process.env[variable]!;
  };
};

Env.loadEnv();
