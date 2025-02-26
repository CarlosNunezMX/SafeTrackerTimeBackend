import type { IService, IServiceResponse } from "../../shared/domain/IService";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import type Contact from "../domain/contact";
import type IContactRepository from "../domain/IContactRepository";
import type ContactDTO from "../infrastructure/ContactDTO";

export default class CreateContactService implements IService<Contact, ContactDTO> {
  constructor(
    private contactRepo: IContactRepository,
    private responseWrapper: typeof ResponseWrapper
  ) { };

  public async service(contact: ContactDTO): Promise<IServiceResponse<Contact> | IServiceResponse<string>> {
    try {
      await this.contactRepo.findContactByIDS(contact.phone, contact.userID);
      return {
        res: new this.responseWrapper(false, "Ya existe un contacto con el mismo número de telefono para esta cuenta!"),
        code: 400
      }
    }
    catch (err) {
      return this.contactRepo.createContact(contact)
        .then(res => ({
          res: new this.responseWrapper(true, res),
          code: 200
        })).catch(error => ({
          code: 500,
          res: new this.responseWrapper(false, (error as Error).message)
        }))
    }
  }
};
