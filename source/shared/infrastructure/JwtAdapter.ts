import type User from "../../user/domain/user";
import { jwt, sign } from "hono/jwt"
export default class JwtAdapter {
  public middleware;
  constructor(private key: string) {
    this.middleware = jwt({ secret: this.key });
  }
  public encode(user: User): Promise<string> {
    return sign({ id: user.id }, this.key);
  }
};
