import type { JSX } from "hono/jsx/jsx-runtime";

export default abstract class MailBuilder<argsTypes> {
  protected info: argsTypes;
  constructor(things: argsTypes) {
    this.info = things;
  }
  public abstract buildMail(): JSX.Element;
};
