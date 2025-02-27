import PasswordHasher from "../../user/infrastructure/PasswordHasher";
import PostgreRepository from "../../user/infrastructure/PostgreRepository";
import JwtAdapter from "./JwtAdapter";
import client from "./PrismaClient";
import ContactsPrismaRepository from "../../contact/infrastructure/PrismaRepository.ts";
import PrismaLocationRepository from "../../location/infrastructure/PrismaLocationRepository.ts";
export default class Constants {
  private static jwtToken = process.env["TOKEN_SECRET"]!;
  public static jwtService = new JwtAdapter(this.jwtToken);
  public static prismaRepository = new PostgreRepository(client);
  public static passwordHasher = new PasswordHasher();
  public static ContactsPrismaRepository = new ContactsPrismaRepository(client);
  public static LocationRepository = new PrismaLocationRepository(client);
}



