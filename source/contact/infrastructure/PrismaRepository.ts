import type { PrismaClient } from "@prisma/client";
import Contact from "../domain/contact";
import type IContactRepository from "../domain/IContactRepository";
import type ContactDTO from "./ContactDTO";
import ContactNotFoundError from "../domain/ContactNotFoundError";
import InvalidContactError from "../domain/InvalidContactError";

export default class ContactPrismaRepository implements IContactRepository {
  constructor(
    private client: PrismaClient
  ) { };

  async createContact(contact: ContactDTO): Promise<Contact> {
    const newContact = await this.client.contact.create({
      data: {
        name: contact.name,
        phone: contact.phone,
        contactOwnerID: contact.userID
      }
    })

    return new Contact(newContact.id, newContact.name, newContact.phone, newContact.contactOwnerID);
  }

  async getContactsNumber(userID: string): Promise<number> {
    const contacts = await this.client.contact.findMany({
      where: { contactOwnerID: userID }
    });

    return contacts.length;
  }
  async deleteContact(id: string): Promise<void> {
    const exists = await this.client.contact.findFirst({
      where: {
        id
      }
    })

    if (!exists)
      throw new ContactNotFoundError();

    await this.client.contact.delete({
      where: {
        id
      }
    });
  }


  async deleteContactByNumber(phone: string): Promise<void> {
    const exists = await this.client.contact.findFirst({
      where: {
        phone
      }
    })

    if (!exists)
      throw new ContactNotFoundError();
    await this.client.contact.delete({
      where: {
        id: exists.id
      }
    });
  }

  async getByID(id: string): Promise<Contact> {
    const contact = await this.client.contact.findFirst({
      where: {
        id
      }
    })
    if (!contact)
      throw new ContactNotFoundError();


    return new Contact(contact.id, contact.name, contact.phone, contact.contactOwnerID);
  }


  async getByUserID(id: string): Promise<Contact[]> {
    const contacts = await this.client.contact.findMany({
      where: {
        contactOwnerID: id
      }
    })
    return contacts.map(contact => new Contact(
      contact.id,
      contact.name,
      contact.phone,
      contact.contactOwnerID
    ));
  }

  async findContactByIDS(phone: string, userID: string): Promise<Contact> {
    const contact = await this.client.contact.findFirst({
      where: {
        phone: phone,
        contactOwnerID: userID
      }
    })
    if (!contact)
      throw new ContactNotFoundError();
    return new Contact(contact.id, contact.name, contact.phone, contact.contactOwnerID);
  }

  async updateContact(contact: Partial<ContactDTO>, contactID: string): Promise<Contact> {
    const newContact = await this.client.contact.update({
      where: {
        id: contactID
      },
      data: {
        name: contact.name,
        phone: contact.phone,
      }
    })

    console.log(newContact)

    return new Contact(newContact.id, newContact.name, newContact.phone, newContact.contactOwnerID);
  }

  async exists(contact: Partial<Pick<Contact, "userID" | "phone" | "id">>): Promise<boolean> {
    if (!contact.userID && !contact.phone && !contact.id)
      throw new InvalidContactError("Se debe proveer un userID o un telefono.");
    const hasContact = await this.client.contact.findFirst({
      where: {
        id: contact.id,
        phone: contact.phone,
        contactOwnerID: contact.userID
      }
    })
    return !!hasContact;
  }
}
