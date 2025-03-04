import type { PrismaClient } from "@prisma/client";
import type IUserRepository from "../domain/IUserRepository";
import User from "../domain/user";
import UserName from "../domain/userName";
import UserNotFoundError from "../domain/UserNotFoundError";
import Contact from "../../contact/domain/contact";
import UserDTO from "./UserDTO";
import UnknownError from "../../shared/domain/UnknownError";

export default class PostgreRepository implements IUserRepository {
  constructor(
    private client: PrismaClient
  ) { };

  async createUser(user: UserDTO): Promise<User> {
    const createdUser = await this.client.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        phone: user.phone,
      }
    })

    return new User(
      createdUser.id,
      createdUser.createdAt,
      new UserName(
        createdUser.firstName,
        createdUser.lastName
      ),
      createdUser.phone,
      createdUser.email,
      createdUser.password,
      createdUser.verified,
      createdUser.hasEmailSent
    )
  }

  async getUserDetails(id: string): Promise<User> {
    const user = await this.client.user.findUnique({
      where: {
        id
      },
      include: { contacts: true }
    })

    if (!user)
      throw new UserNotFoundError();

    return new User(
      user.id,
      user.createdAt,
      new UserName(user.firstName, user.lastName),
      user.phone,
      user.email,
      user.password,
      user.verified,
      user.hasEmailSent,
      user.contacts.map(item => new Contact(item.id, item.name, item.phone, item.id))
    )
  }
  async getByEmail(email: string): Promise<User> {
    const user = await this.client.user.findUnique({
      where: {
        email
      },
      include: { contacts: true }
    })

    if (!user)
      throw new UserNotFoundError();

    return new User(
      user.id,
      user.createdAt,
      new UserName(user.firstName, user.lastName),
      user.phone,
      user.email,
      user.password,
      user.verified,
      user.hasEmailSent,
      user.contacts.map(item => new Contact(item.id, item.name, item.phone, item.contactOwnerID))
    )
  }


  async getUsers(): Promise<User[]> {
    const users = await this.client.user.findMany({
      include: {
        contacts: true
      }
    })
    return users.map(user => new User(
      user.id,
      user.createdAt,
      new UserName(user.firstName, user.lastName),
      user.phone,
      user.email,
      user.password,
      user.verified,
      user.hasEmailSent,
      user.contacts.map(contact => new Contact(contact.id, contact.name, contact.phone, contact.contactOwnerID))
    ))
  }
  async updateUser(user: Partial<UserDTO>, userID: string): Promise<User> {
    const hasUser = await this.client.user.findFirst({
      where: {
        id: userID
      }
    })
    if (!hasUser)
      throw new UserNotFoundError();
    const newUser = await this.client.user.update({
      where: {
        id: userID
      },
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        email: user.email,
        phone: user.phone,
        verified: user.verifed
      }
    })

    return new User(
      newUser.id,
      newUser.createdAt,
      new UserName(newUser.firstName, newUser.lastName),
      newUser.phone,
      newUser.email,
      newUser.password,
      newUser.verified,
      newUser.hasEmailSent
    )
  }


  public async exists(user: Partial<Pick<User, "email" | "phone" | "id">>): Promise<boolean> {
    if (!user.phone && !user.email && !user.id)
      throw new UnknownError("Debe de colocar algun campo a buscar.");
    const hasUser = await this.client.user.findFirst({
      where: {
        OR: [
          { email: user.email },
          { phone: user.phone },
          { id: user.id }
        ]
      }
    });
    return !!hasUser;
  }
};
