import { Request as ExpressRequest, Response } from "express";
import prisma from "../config/database";
import { IUser } from "src/interfaces/auth.interfaces";
interface CustomRequest extends ExpressRequest {
  user?: IUser;
}
export class ServiceController {
  async createService(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const newService = await prisma.service.create({
        data: {
          ...req.body,
          patient: {
            connect: { id: patientid },
          },
        },
      });

      res.status(201).json({
        message: "Service created successfully",
        Service: newService,
      });
    } catch (error) {
      console.error("Create Service error:", error);
      res.status(500).json({ error: "Failed to create Service" });
    }
  }

  async getServices(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { patientid } = req.params;
      const { page = "1", limit = "10" } = req.query;

      const parsedPage = Math.max(1, parseInt(page as string, 10));
      const parsedLimit = Math.max(1, parseInt(limit as string, 10));

      const Services = await prisma.service.findMany({
        orderBy: { createdAt: "desc" },
        where: { patientId: patientid },
        skip: (parsedPage - 1) * parsedLimit,
        take: parsedLimit,
      });

      const totalCount = await prisma.service.count({
        where: { patientId: patientid },
      });

      res.status(200).json({
        totalCount,
        totalPages: Math.ceil(totalCount / parsedLimit),
        currentPage: parsedPage,
        Services,
      });
    } catch (error) {
      console.error("Get Services error:", error);
      res.status(500).json({ error: "Failed to fetch Services" });
    }
  }

  async getServiceById(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const Service = await prisma.service.findFirst({
        where: { id, patientId: patientid },
      });

      if (!Service) {
        res.status(404).json({ error: "Service not found" });
        return;
      }

      res.status(200).json({ Service });
    } catch (error) {
      console.error("Get Service error:", error);
      res.status(500).json({ error: "Failed to fetch Service" });
    }
  }

  async updateService(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const Service = await prisma.service.update({
        where: { id },
        data: {
          ...req.body,
        },
      });

      res.status(200).json({
        message: "Service updated successfully",
        Service,
      });
    } catch (error) {
      console.error("Update Service error:", error);
      res.status(500).json({ error: "Failed to update Service" });
    }
  }

  async deleteService(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { id, patientid } = req.params;

      const Service = await prisma.service.findFirst({
        where: { id, patientId: patientid },
      });

      if (!Service) {
        res.status(404).json({ error: "Service not found" });
        return;
      }

      await prisma.service.delete({
        where: { id },
      });

      res.status(200).json({
        message: "Service deleted successfully",
      });
    } catch (error) {
      console.error("Delete Service error:", error);
      res.status(500).json({ error: "Failed to delete Service" });
    }
  }
}
