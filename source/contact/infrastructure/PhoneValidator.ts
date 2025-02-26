export default class PhoneValidator {
  /**
    * @url https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
  */
  private static readonly PhoneRegex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);
  static validate(phone: string) {
    return this.PhoneRegex.test(phone);
  }
}
