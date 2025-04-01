import type ContactDTO from "../infrastructure/ContactDTO";
import type Contact from "./contact";

export default interface IContactRepository {
  createContact(contact: ContactDTO): Promise<Contact>;
  deleteContact(id: string): Promise<void>;
  deleteContactByNumber(phone: string): Promise<void>;
  getByUserID(id: string): Promise<Contact[]>;
  getByID(id: string): Promise<Contact>;
  findContactByIDS(phone: string, userID: string): Promise<Contact>;
  updateContact(contact: Partial<ContactDTO>, contactID: string): Promise<Contact>;
  getContactsNumber(userID: string): Promise<number>;
  exists(contact: Partial<Pick<Contact, "phone" | "userID" | "id">>): Promise<boolean>
};
