import { PrismaClient } from "@prisma/client";
import { User } from "../../domain";

const prisma = new PrismaClient();

export class UserRepository {
  async create(data: User) {
    try {
      const result = await prisma.user.create({ data });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string) {
    try {
      const result = await prisma.user.findFirst({
        where: { email },
      });

      return result
    } catch (error) {
      throw error;
    }
  }
}