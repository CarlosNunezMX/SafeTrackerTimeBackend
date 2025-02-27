import type { IService, IServiceResponse } from "../../shared/domain/IService";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
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
      const newContact = await this.contactRepo.createContact(contact);
      return {
        res: new this.responseWrapper(true, newContact),
        code: 200
      }
    }
    catch (err) {
      if (err instanceof InvalidContactError)
        return {
          code: 500,
          res: new this.responseWrapper(false, err.message)
        }

      console.error(err);

      return {
        code: 500,
        res: new this.responseWrapper(false, "Error desconocido!")
      }
    }
  }
};
