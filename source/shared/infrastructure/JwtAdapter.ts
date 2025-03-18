import { verify } from "hono/utils/jwt/jwt";
import type User from "../../user/domain/user";
import { jwt, sign } from "hono/jwt"
import type { JWTPayload } from "hono/utils/jwt/types";
export enum TokenUsage {
  AUTH,
  VERIFICATION,
  RECOVER_PASSWORD
};
interface IToken {
  id: string,
  usage: TokenUsage
}
export default class JwtAdapter {
  public middleware;
  constructor(private key: string) {
    this.middleware = jwt({ secret: this.key });
  }
  public encode(user: User, usage: TokenUsage, additions?: JWTPayload & Record<string, any>): Promise<string> {
    return sign({ id: user.id, usage, ...additions}, this.key);
  }

  public decode<T>(token: string): Promise<IToken & T & JWTPayload> {
    return verify(token, this.key) as (Promise<JWTPayload & T & IToken>);
  }
};
