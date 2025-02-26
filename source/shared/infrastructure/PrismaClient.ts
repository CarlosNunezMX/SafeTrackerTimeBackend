import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function CloseClient() {
  await client.$disconnect();
}

export default client;
