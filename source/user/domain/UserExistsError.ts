export default class UserExistsError extends Error {
  constructor() {
    super("El número/email ya ha sido registrado!");
  }
}
