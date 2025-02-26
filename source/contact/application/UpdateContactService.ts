import type { IService, IServiceResponse } from "../../shared/domain/IService";
import { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import type Contact from "../domain/contact";
import ContactNotFoundError from "../domain/ContactNotFoundError";
import type IContactRepository from "../domain/IContactRepository";
import type ContactDTO from "../infrastructure/ContactDTO";

export default class UpdateContactService implements IService<Contact, [Partial<ContactDTO>, string]> {
  constructor(
    private contactRepo: IContactRepository,
    private responseWrapper: typeof ResponseWrapper
  ) { };
  private determinate(err: unknown) {
    if (err instanceof ContactNotFoundError)
      return 404;
    return 500;
  }
  public async service(args: [Partial<ContactDTO>, string]): Promise<IServiceResponse<Contact> | IServiceResponse<string>> {
    try {
      const [contact, contactID] = args;
      const hasContact = this.contactRepo.exists(contactID);
      if (!hasContact)
        throw new ContactNotFoundError();
      let UpdatedContact = await this.contactRepo.updateContact(contact, contactID);
      return {
        res: new ResponseWrapper(true, UpdatedContact),
        code: 200
      }
    } catch (err) {
      return {
        res: new this.responseWrapper(false, (err as string)),
        code: this.determinate(err)
      }
    }
  };
};
