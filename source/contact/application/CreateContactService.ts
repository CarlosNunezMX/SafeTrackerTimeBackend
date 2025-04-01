import type { IService, IServiceResponse } from "../../shared/domain/IService";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import CatchResponseError from "../../shared/infrastructure/catchError";
import Contact from "../domain/contact";
import type IContactRepository from "../domain/IContactRepository";
import InvalidContactError from "../domain/InvalidContactError";
import type ContactDTO from "../infrastructure/ContactDTO";

export default class CreateContactService implements IService<Contact, ContactDTO> {
  constructor(
    private contactRepo: IContactRepository,
    private responseWrapper: typeof ResponseWrapper
  ) { };

  public async service(contact: ContactDTO): Promise<IServiceResponse<Contact> | IServiceResponse<string>> {
    try {
      const exists = await this.contactRepo.exists(contact);
      if (exists)
        throw new InvalidContactError("El contacto ya existe!");

      const howContacts = await this.contactRepo.getContactsNumber(contact.userID);
      if (howContacts >= 3)
        throw new InvalidContactError("No se puede registrar más de tres contactos!");
      const newContact = await this.contactRepo.createContact(contact);
      return {
        res: new this.responseWrapper(true, newContact),
        code: 200
      }
    }
    catch (error) {
      return CatchResponseError(this.responseWrapper, error);
    }
  }
};
