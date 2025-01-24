import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class ImmunizationController {
  async createImmunization(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { dateAdministered, dateExpired, ...rest } = req.body;
      const newImmunization = await prisma.immunization.create({
        data: {
          ...rest,
          dateExpired: new Date(dateExpired),
          dateAdministered: new Date(dateAdministered),
          patient: {
            connect: { id: patientid },
          },
        },
      });

      res.status(201).json({
        message: "Immunization created successfully",
        Immunization: newImmunization,
      });
    } catch (error) {
      console.error("Create Immunization error:", error);
      res.status(500).json({ error: "Failed to create Immunization" });
    }
  }

  async getImmunizations(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const Immunizations = await prisma.immunization.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.immunization.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        Immunizations,
      });
    } catch (error) {
      console.error("Get Immunizations error:", error);
      res.status(500).json({ error: "Failed to fetch Immunizations" });
    }
  }

  async getImmunizationById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const Immunization = await prisma.immunization.findFirst({
        where: { id, patientId: patientid },
      });

      if (!Immunization) {
        res.status(404).json({ error: "Immunization not found" });
        return;
      }

      res.status(200).json({ Immunization });
    } catch (error) {
      console.error("Get Immunization error:", error);
      res.status(500).json({ error: "Failed to fetch Immunization" });
    }
  }

  async updateImmunization(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { dateAdministered, dateExpired, ...rest } = req.body;
      const Immunization = await prisma.immunization.update({
        where: { id },
        data: {
          ...rest,
          dateExpired: new Date(dateExpired),
          dateAdministered: new Date(dateAdministered),
        },
      });

      res.status(200).json({
        message: "Immunization updated successfully",
        Immunization,
      });
    } catch (error) {
      console.error("Update Immunization error:", error);
      res.status(500).json({ error: "Failed to update Immunization" });
    }
  }

  async deleteImmunization(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const Immunization = await prisma.immunization.findFirst({
        where: { id, patientId: patientid },
      });

      if (!Immunization) {
        res.status(404).json({ error: "Immunization not found" });
        return;
      }

      await prisma.immunization.delete({
        where: { id },
      });

      res.status(200).json({
        message: "Immunization deleted successfully",
      });
    } catch (error) {
      console.error("Delete Immunization error:", error);
      res.status(500).json({ error: "Failed to delete Immunization" });
    }
  }
}
