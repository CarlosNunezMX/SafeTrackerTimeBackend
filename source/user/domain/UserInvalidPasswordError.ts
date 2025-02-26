export default class UserInvalidPasswordError extends Error {
  constructor() {
    super("Contraseña invalida!");
  }
}
