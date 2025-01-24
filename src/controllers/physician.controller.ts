import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class PhysicianController {
  async createPhysician(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const newPhysician = await prisma.physician.create({
        data: {
          ...req.body,
          patient: {
            connect: { id: patientid },
          },
        },
      });

      res.status(201).json({
        message: "Physician created successfully",
        Physician: newPhysician,
      });
    } catch (error) {
      console.error("Create Physician error:", error);
      res.status(500).json({ error: "Failed to create Physician" });
    }
  }

  async getPhysicians(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const Physicians = await prisma.physician.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.physician.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        Physicians,
      });
    } catch (error) {
      console.error("Get Physicians error:", error);
      res.status(500).json({ error: "Failed to fetch Physicians" });
    }
  }

  async getPhysicianById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const physician = await prisma.physician.findFirst({
        where: { id, patientId: patientid },
      });

      if (!physician) {
        res.status(404).json({ error: "physician not found" });
        return;
      }

      res.status(200).json({ physician });
    } catch (error) {
      console.error("Get Physician error:", error);
      res.status(500).json({ error: "Failed to fetch Physician" });
    }
  }

  async updatePhysician(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const physician = await prisma.physician.update({
        where: { id },
        data: {
          ...req.body,
        },
      });

      res.status(200).json({
        message: "physician updated successfully",
        physician,
      });
    } catch (error) {
      console.error("Update Physician error:", error);
      res.status(500).json({ error: "Failed to update Physician" });
    }
  }

  async deletePhysician(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const Physician = await prisma.physician.findFirst({
        where: { id, patientId: patientid },
      });

      if (!Physician) {
        res.status(404).json({ error: "Physician not found" });
        return;
      }

      await prisma.physician.delete({
        where: { id },
      });

      res.status(200).json({
        message: "Physician deleted successfully",
      });
    } catch (error) {
      console.error("Delete Physician error:", error);
      res.status(500).json({ error: "Failed to delete Physician" });
    }
  }
}
