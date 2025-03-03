import { verify } from "hono/utils/jwt/jwt";
import type User from "../../user/domain/user";
import { jwt, sign } from "hono/jwt"
import type { JWTPayload } from "hono/utils/jwt/types";
export default class JwtAdapter {
  public middleware;
  constructor(private key: string) {
    this.middleware = jwt({ secret: this.key });
  }
  public encode(user: User, additions?: Object): Promise<string> {
    return sign({ id: user.id, date: Date.now(), ...additions }, this.key);
  }

  public decode<T>(token: string): Promise<T & JWTPayload> {
    return verify(token, this.key) as (Promise<JWTPayload & T>);
  }
};
