import { Request, Response } from "express";
import prisma from "../config/database";
import { Role } from "@prisma/client";

export class UserController {
  async getUsers(req: Request, res: Response) {
    try {
      // Request queries
      const { username, role, email, limit = "9", page = "1" } = req.query;
  
      // Parse pagination parameters
      const parsedLimit = Number(limit) || 9;
      const parsedPage = Number(page) || 1;
  
      // Build where clause dynamically
      const where: any = {};
  
      if (typeof username === "string" && username.trim()) {
        where.username = {
          contains: username,
          mode: "insensitive",
        };
      }
  
      if (typeof email === "string" && email.trim()) {
        where.email = {
          contains: email,
          mode: "insensitive",
        };
      }
  
      if (typeof role === "string" && Object.values(Role).includes(role as Role)) {
        where.role = role as Role;
      }
  
      // Fetch users with Prisma
      const users = await prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit, // Limit the number of results
      });
  
      // Optionally, get total count for pagination metadata
      const totalUsers = await prisma.user.count({ where });
  
      return res.status(200).json({
        users,
        totalUsers,
        currentPage: parsedPage,
        totalPages: Math.ceil(totalUsers / parsedLimit),
      });
    } catch (error) {
      console.error("Get Users error:", error);
      return res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ user });
    } catch (error) {
      console.error("Get user error:", error);
      return res.status(500).json({ error: "Failed to fetch user" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userExist = await prisma.user.findUnique({
        where: { id },
      });

      if (!userExist) {
        return res.status(404).json({ error: "User not found" });
      }
      const user = await prisma.user.update({
        where: { id },
        data: {
          ...req.body,
        },
      });

      return res.status(200).json({
        message: "User updated successfully",
        user,
      });
    } catch (error) {
      console.error("Update User error:", error);
      return res.status(500).json({ error: "Failed to update User" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      //   fimd the user
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      await prisma.user.delete({
        where: { id },
      });

      return res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Delete user error:", error);
      return res.status(500).json({ error: "Failed to delete user" });
    }
  }
}
