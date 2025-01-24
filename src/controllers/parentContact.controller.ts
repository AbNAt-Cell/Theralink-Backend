import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class ParentContactController {
  async createParentContact(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { ...rest } = req.body;
      const newParentContact = await prisma.parentContact.create({
        data: {
          ...rest,
          patient: {
            connect: { id: patientid },
          },
        },
      });

      res.status(201).json({
        message: "ParentContact created successfully",
        ParentContact: newParentContact,
      });
    } catch (error) {
      console.error("Create ParentContact error:", error);
      res.status(500).json({ error: "Failed to create ParentContact" });
    }
  }

  async getParentContacts(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const ParentContact = await prisma.parentContact.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.parentContact.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        ParentContact,
      });
    } catch (error) {
      console.error("Get ParentContacts error:", error);
      res.status(500).json({ error: "Failed to fetch ParentContacts" });
    }
  }

  async getParentContactById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const ParentContact = await prisma.parentContact.findFirst({
        where: { id, patientId: patientid },
      });

      if (!ParentContact) {
        res.status(404).json({ error: "ParentContact not found" });
        return;
      }

      res.status(200).json({ ParentContact });
    } catch (error) {
      console.error("Get ParentContact error:", error);
      res.status(500).json({ error: "Failed to fetch ParentContact" });
    }
  }

  async updateParentContact(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { ...rest } = req.body;
      const ParentContact = await prisma.parentContact.update({
        where: { id },
        data: {
          ...rest,
        },
      });

      res.status(200).json({
        message: "ParentContact updated successfully",
        ParentContact,
      });
    } catch (error) {
      console.error("Update ParentContact error:", error);
      res.status(500).json({ error: "Failed to update ParentContact" });
    }
  }

  async deleteParentContact(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const ParentContact = await prisma.parentContact.findFirst({
        where: { id, patientId: patientid },
      });

      if (!ParentContact) {
        res.status(404).json({ error: "ParentContact not found" });
        return;
      }

      await prisma.parentContact.delete({
        where: { id },
      });

      res.status(200).json({
        message: "ParentContact deleted successfully",
      });
    } catch (error) {
      console.error("Delete ParentContact error:", error);
      res.status(500).json({ error: "Failed to delete ParentContact" });
    }
  }
}
