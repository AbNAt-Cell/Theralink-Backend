import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class TreatmentGoalsController {
  async createTreatmentGoals(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { treatmentplanId } = req.params;
      const { startDate, endDate, targetDate, ...rest } = req.body;
      const newTreatmentGoals = await prisma.treatmentGoals.create({
        data: {
          ...rest,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          targetDate: new Date(targetDate),
          treatmentplan: {
            connect: { id: treatmentplanId },
          },
        },
      });

      res.status(201).json({
        message: "TreatmentGoals created successfully",
        TreatmentGoals: newTreatmentGoals,
      });
    } catch (error) {
      console.error("Create TreatmentGoals error:", error);
      res.status(500).json({ error: "Failed to create TreatmentGoals" });
    }
  }

  async getTreatmentGoalss(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { treatmentplanId } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const TreatmentGoalss = await prisma.treatmentGoals.findMany({
        orderBy: { createdAt: "desc" },
        where: { treatmentplanId: treatmentplanId },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.treatmentGoals.count({
        where: { treatmentplanId: treatmentplanId },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        TreatmentGoalss,
      });
    } catch (error) {
      console.error("Get TreatmentGoalss error:", error);
      res.status(500).json({ error: "Failed to fetch TreatmentGoalss" });
    }
  }

  async getTreatmentGoalsById(
    req: CustomRequest,
    res: Response
  ): Promise<void> {
    try {
      const { id, treatmentplanId } = req.params;

      const TreatmentGoals = await prisma.treatmentGoals.findFirst({
        where: { id, treatmentplanId: treatmentplanId },
      });

      if (!TreatmentGoals) {
        res.status(404).json({ error: "TreatmentGoals not found" });
        return;
      }

      res.status(200).json({ TreatmentGoals });
    } catch (error) {
      console.error("Get TreatmentGoals error:", error);
      res.status(500).json({ error: "Failed to fetch TreatmentGoals" });
    }
  }

  async updateTreatmentGoals(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { startDate, endDate, targetDate, ...rest } = req.body;
      const TreatmentGoals = await prisma.treatmentGoals.update({
        where: { id },
        data: {
          ...rest,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          targetDate: new Date(targetDate),
        },
      });

      res.status(200).json({
        message: "TreatmentGoals updated successfully",
        TreatmentGoals,
      });
    } catch (error) {
      console.error("Update TreatmentGoals error:", error);
      res.status(500).json({ error: "Failed to update TreatmentGoals" });
    }
  }

  async deleteTreatmentGoals(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, treatmentplanId } = req.params;

      const TreatmentGoals = await prisma.treatmentGoals.findFirst({
        where: { id, treatmentplanId: treatmentplanId },
      });

      if (!TreatmentGoals) {
        res.status(404).json({ error: "TreatmentGoals not found" });
        return;
      }

      await prisma.treatmentGoals.delete({
        where: { id },
      });

      res.status(200).json({
        message: "TreatmentGoals deleted successfully",
      });
    } catch (error) {
      console.error("Delete TreatmentGoals error:", error);
      res.status(500).json({ error: "Failed to delete TreatmentGoals" });
    }
  }
}
