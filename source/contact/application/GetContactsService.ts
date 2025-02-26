import type IContactRepository from "../domain/IContactRepository";

export default class GetContactsService {
  constructor(
    private contactRepo: IContactRepository
  ) { };

  public getContacts(userID: string) {
    return this.contactRepo.getByUserID(userID);
  }
};
