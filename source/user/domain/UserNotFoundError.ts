export default class UserNotFoundError extends Error {
  constructor() {
    super("El usuario no existe!")
  }
};
