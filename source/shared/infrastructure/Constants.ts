import PasswordHasher from "../../user/infrastructure/PasswordHasher";
import PrismaUserRepository from "../../user/infrastructure/PrismaUserRepository";
import JwtAdapter from "./JwtAdapter";
import client from "./PrismaClient";
import ContactsPrismaRepository from "../../contact/infrastructure/PrismaRepository.ts";
import PrismaLocationRepository from "../../location/infrastructure/PrismaLocationRepository.ts";
import { Env } from "../../server/infrastructure/envCheck.ts";
import EmailClient from "../../auth/infrastructure/EmailClient.tsx";
import LocationEncryption from "@location/infrastructure/encrypt.ts";

export default class Constants {
  private static jwtToken = Env.variables.TOKEN_SECRET;
  public static Env = Env.variables;
  public static jwtService = new JwtAdapter(this.jwtToken);
  public static UserRepository = new PrismaUserRepository(client);
  public static passwordHasher = new PasswordHasher();
  public static ContactsRepository = new ContactsPrismaRepository(client);
  public static LocationEncryptionService = new LocationEncryption(this.Env.LOCATION_KEY);
  public static LocationRepository = new PrismaLocationRepository(client, this.LocationEncryptionService);
  public static emailClient = new EmailClient(
    Env.variables.RESEND_API_KEY,
    `noreply@${Env.variables.RESEND_DOMAIN}`
  );
}



