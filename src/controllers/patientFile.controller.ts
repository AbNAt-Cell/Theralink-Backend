import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class PatientFileController {
  async createPatientFile(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { ...rest } = req.body;
      const newPatientFile = await prisma.patientFile.create({
        data: {
          ...rest,
          patient: {
            connect: { id: patientid },
          },
        },
      });

      res.status(201).json({
        message: "patientFile created successfully",
        patientFile: newPatientFile,
      });
    } catch (error) {
      console.error("Create patientFile error:", error);
      res.status(500).json({ error: "Failed to create patientFile" });
    }
  }

  async getPatientFiles(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const patientFile = await prisma.patientFile.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.patientFile.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        patientFile,
      });
    } catch (error) {
      console.error("Get PatientFiles error:", error);
      res.status(500).json({ error: "Failed to fetch PatientFiles" });
    }
  }

  async getPatientFileById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const patientFile = await prisma.patientFile.findFirst({
        where: { id, patientId: patientid },
      });

      if (!patientFile) {
        res.status(404).json({ error: "patientFile not found" });
        return;
      }

      res.status(200).json({ patientFile });
    } catch (error) {
      console.error("Get patientFile error:", error);
      res.status(500).json({ error: "Failed to fetch patientFile" });
    }
  }

  async updatePatientFile(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { ...rest } = req.body;
      const patientFile = await prisma.patientFile.update({
        where: { id },
        data: {
          ...rest,
        },
      });

      res.status(200).json({
        message: "patientFile updated successfully",
        patientFile,
      });
    } catch (error) {
      console.error("Update patientFile error:", error);
      res.status(500).json({ error: "Failed to update patientFile" });
    }
  }

  async deletePatientFile(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const patientFile = await prisma.patientFile.findFirst({
        where: { id, patientId: patientid },
      });

      if (!patientFile) {
        res.status(404).json({ error: "patientFile not found" });
        return;
      }

      await prisma.patientFile.delete({
        where: { id },
      });

      res.status(200).json({
        message: "patientFile deleted successfully",
      });
    } catch (error) {
      console.error("Delete patientFile error:", error);
      res.status(500).json({ error: "Failed to delete patientFile" });
    }
  }
}
