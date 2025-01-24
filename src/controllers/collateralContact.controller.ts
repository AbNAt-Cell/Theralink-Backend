import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class CollateralContactController {
  async createCollateralContact(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { ...rest } = req.body;
      const newCollateralContact = await prisma.collateralContact.create({
        data: {
          ...rest,
          patient: {
            connect: { id: patientid },
          },
        },
      });

      res.status(201).json({
        message: "CollateralContact created successfully",
        CollateralContact: newCollateralContact,
      });
    } catch (error) {
      console.error("Create CollateralContact error:", error);
      res.status(500).json({ error: "Failed to create CollateralContact" });
    }
  }

  async getCollateralContacts(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const CollateralContact = await prisma.collateralContact.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.collateralContact.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        CollateralContact,
      });
    } catch (error) {
      console.error("Get CollateralContacts error:", error);
      res.status(500).json({ error: "Failed to fetch CollateralContacts" });
    }
  }

  async getCollateralContactById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const CollateralContact = await prisma.collateralContact.findFirst({
        where: { id, patientId: patientid },
      });

      if (!CollateralContact) {
        res.status(404).json({ error: "CollateralContact not found" });
        return;
      }

      res.status(200).json({ CollateralContact });
    } catch (error) {
      console.error("Get CollateralContact error:", error);
      res.status(500).json({ error: "Failed to fetch CollateralContact" });
    }
  }

  async updateCollateralContact(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { ...rest } = req.body;
      const CollateralContact = await prisma.collateralContact.update({
        where: { id },
        data: {
          ...rest,
        },
      });

      res.status(200).json({
        message: "CollateralContact updated successfully",
        CollateralContact,
      });
    } catch (error) {
      console.error("Update CollateralContact error:", error);
      res.status(500).json({ error: "Failed to update CollateralContact" });
    }
  }

  async deleteCollateralContact(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const CollateralContact = await prisma.collateralContact.findFirst({
        where: { id, patientId: patientid },
      });

      if (!CollateralContact) {
        res.status(404).json({ error: "CollateralContact not found" });
        return;
      }

      await prisma.collateralContact.delete({
        where: { id },
      });

      res.status(200).json({
        message: "CollateralContact deleted successfully",
      });
    } catch (error) {
      console.error("Delete CollateralContact error:", error);
      res.status(500).json({ error: "Failed to delete CollateralContact" });
    }
  }
}
