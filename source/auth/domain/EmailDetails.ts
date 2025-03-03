import type { SmtpCredentails } from "./SmtpInfo";

export default class EmailDetails {
  constructor(
    public sendTo: string,
    public token: string,
    public subject: string,
    public name: string
  ) { };
};
