import type User from "../../user/domain/user";

export default class Contact {
  constructor(
    public id: string,
    public name: string,
    public phone: string,
    public userID: string,
    public user?: User

  ) { };
}
