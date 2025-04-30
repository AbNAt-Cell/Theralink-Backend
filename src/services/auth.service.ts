import {
  generatePassword,
  generateToken,
  generateUsername,
  hashPassword,
} from "../utils/auth.utils";
import prisma from "../config/database";
import { Role } from "@prisma/client";
import { EmailService } from "./email.service";

export const signupService = async (
  email: string,
  role: string,
  tx?: any,
  sendEmail: boolean = true,
  firstName?: string | null,
  lastName?: string | null
) => {
  const prismaClient = tx || prisma;
  const username = generateUsername(email);
  const password = generatePassword();
  const hashedPassword = await hashPassword(password);
  const roleEnum: Role = role as Role;

  lastName = lastName ? lastName : null;
  firstName = firstName ? firstName : null;
  const user = await prismaClient.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      role: roleEnum,
      firstName,
      lastName,
    },
  });

  const token = generateToken(user);

  // Only send email if sendEmail is true and not in a transaction
  if (sendEmail && !tx) {
    const emailService = new EmailService();
    await emailService.sendCredentials(email, username, password);
    console.log("Email sent successfully");
  }

  return { user, token, username, password };
};
