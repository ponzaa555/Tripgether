import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { prisma } from "../../prisma";

export async function encryptPassword(password: string): Promise<string> {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error encrypting password:", error);
    throw error; // Optionally rethrow the error
  }
}

export async function CreateUser(email: string, password: string): Promise<User> 
{
  try {
    const hashedPassword = await encryptPassword(password);
    const newUser = await prisma.user.create<User>({
      data: {
        email: email,
        password: hashedPassword,
        emailVerified: null,
        image: null,
        name: null,
        updatedAt: new Date(),
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

