import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class EligibilityController {
  async checkEligibility(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { startDate, endDate, ...rest } = req.body;
      const newEligibility = await prisma.insurance.create({
        data: {
          ...rest,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          patient: {
            connect: { id: patientid },
          },
        },
      });

      res.status(201).json({
        message: "Eligibility created successfully",
        insurance: newEligibility,
      });
    } catch (error) {
      console.error("Create Eligibility error:", error);
      res.status(500).json({ error: "Failed to create Eligibility" });
    }
  }

  async getEligibilitys(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const insurance = await prisma.insurance.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.insurance.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        insurance,
      });
    } catch (error) {
      console.error("Get insurance error:", error);
      res.status(500).json({ error: "Failed to fetch Eligibilitys" });
    }
  }

  async getEligibilityById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const insurance = await prisma.insurance.findFirst({
        where: { id, patientId: patientid },
      });

      if (!insurance) {
        res.status(404).json({ error: "Eligibility not found" });
        return;
      }

      res.status(200).json({ insurance });
    } catch (error) {
      console.error("Get Eligibility error:", error);
      res.status(500).json({ error: "Failed to fetch Eligibility" });
    }
  }

  async updateEligibility(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { startDate, endDate, ...rest } = req.body;
      const insurance = await prisma.insurance.update({
        where: { id },
        data: {
          ...rest,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      });

      res.status(200).json({
        message: "Eligibility updated successfully",
        insurance,
      });
    } catch (error) {
      console.error("Update Eligibility error:", error);
      res.status(500).json({ error: "Failed to update Eligibility" });
    }
  }

  async deleteEligibility(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const insurance = await prisma.insurance.findFirst({
        where: { id, patientId: patientid },
      });

      if (!insurance) {
        res.status(404).json({ error: "insurance not found" });
        return;
      }

      await prisma.insurance.delete({
        where: { id },
      });

      res.status(200).json({
        message: "Eligibility deleted successfully",
      });
    } catch (error) {
      console.error("Delete Eligibility error:", error);
      res.status(500).json({ error: "Failed to delete Eligibility" });
    }
  }
}
