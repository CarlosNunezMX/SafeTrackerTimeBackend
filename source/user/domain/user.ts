import type Contact from "@contact/domain/contact";
import type UserName from "./userName";

export type UserRank = "Admin" | "User";

export default class User {
  constructor(
    public id: string,
    public createdAt: Date,
    public userName: UserName,
    public phone: string,
    public email: string,
    public password: string,
    public verified: boolean,
    public hasEmailSent: boolean,
    public rank: UserRank = "User",
    public contacts: Contact[] = []
  ) { };
}
