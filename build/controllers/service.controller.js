"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
const database_1 = __importDefault(require("../config/database"));
class ServiceController {
    async createService(req, res) {
        try {
            const { patientid } = req.params;
            const newService = await database_1.default.service.create({
                data: Object.assign(Object.assign({}, req.body), { patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "Service created successfully",
                Service: newService,
            });
        }
        catch (error) {
            console.error("Create Service error:", error);
            res.status(500).json({ error: "Failed to create Service" });
        }
    }
    async getServices(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const Services = await database_1.default.service.findMany({
                orderBy: { createdAt: "desc" },
                where: { patientId: patientid },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.service.count({
                where: { patientId: patientid },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                Services,
            });
        }
        catch (error) {
            console.error("Get Services error:", error);
            res.status(500).json({ error: "Failed to fetch Services" });
        }
    }
    async getServiceById(req, res) {
        try {
            const { id, patientid } = req.params;
            const Service = await database_1.default.service.findFirst({
                where: { id, patientId: patientid },
            });
            if (!Service) {
                res.status(404).json({ error: "Service not found" });
                return;
            }
            res.status(200).json({ Service });
        }
        catch (error) {
            console.error("Get Service error:", error);
            res.status(500).json({ error: "Failed to fetch Service" });
        }
    }
    async updateService(req, res) {
        try {
            const { id } = req.params;
            const Service = await database_1.default.service.update({
                where: { id },
                data: Object.assign({}, req.body),
            });
            res.status(200).json({
                message: "Service updated successfully",
                Service,
            });
        }
        catch (error) {
            console.error("Update Service error:", error);
            res.status(500).json({ error: "Failed to update Service" });
        }
    }
    async deleteService(req, res) {
        try {
            const { id, patientid } = req.params;
            const Service = await database_1.default.service.findFirst({
                where: { id, patientId: patientid },
            });
            if (!Service) {
                res.status(404).json({ error: "Service not found" });
                return;
            }
            await database_1.default.service.delete({
                where: { id },
            });
            res.status(200).json({
                message: "Service deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete Service error:", error);
            res.status(500).json({ error: "Failed to delete Service" });
        }
    }
}
exports.ServiceController = ServiceController;
//# sourceMappingURL=service.controller.js.map