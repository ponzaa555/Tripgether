import * as bcrypt from "bcrypt";

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
