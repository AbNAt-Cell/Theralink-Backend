import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class VitalController {
  async createVital(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const newVital = await prisma.vitals.create({
        data: {
          ...req.body,
          patient: {
            connect: { id: patientid },
          },
        },
      });

      res.status(201).json({
        message: "vital created successfully",
        vital: newVital,
      });
    } catch (error) {
      console.error("Create vital error:", error);
      res.status(500).json({ error: "Failed to create vital" });
    }
  }

  async getVitals(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const Vitals = await prisma.vitals.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.vitals.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        Vitals,
      });
    } catch (error) {
      console.error("Get Vitals error:", error);
      res.status(500).json({ error: "Failed to fetch Vitals" });
    }
  }

  async getVitalById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const vital = await prisma.vitals.findFirst({
        where: { id, patientId: patientid },
      });

      if (!vital) {
        res.status(404).json({ error: "vital not found" });
        return;
      }

      res.status(200).json({ vital });
    } catch (error) {
      console.error("Get vital error:", error);
      res.status(500).json({ error: "Failed to fetch vital" });
    }
  }

  async updateVital(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const vital = await prisma.vitals.update({
        where: { id },
        data: {
          ...req.body,
        },
      });

      res.status(200).json({
        message: "vital updated successfully",
        vital,
      });
    } catch (error) {
      console.error("Update vital error:", error);
      res.status(500).json({ error: "Failed to update vital" });
    }
  }

  async deleteVital(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const vital = await prisma.vitals.findFirst({
        where: { id, patientId: patientid },
      });

      if (!vital) {
        res.status(404).json({ error: "vital not found" });
        return;
      }

      await prisma.vitals.delete({
        where: { id },
      });

      res.status(200).json({
        message: "vital deleted successfully",
      });
    } catch (error) {
      console.error("Delete vital error:", error);
      res.status(500).json({ error: "Failed to delete vital" });
    }
  }
}
