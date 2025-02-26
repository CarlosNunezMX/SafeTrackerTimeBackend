export default class EmailValidator {
  private static readonly Regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  public static validate(email: string) {
    return this.Regex.test(email);
  }
}
