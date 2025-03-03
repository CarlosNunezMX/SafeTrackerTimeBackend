export default class UserDTO {
  constructor(
    public email: string,
    public phone: string,
    public firstName: string,
    public lastName: string,
    public password: string,
    public verifed: boolean = false
  ) { };
};
