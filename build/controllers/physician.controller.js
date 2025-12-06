"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicianController = void 0;
const database_1 = __importDefault(require("../config/database"));
class PhysicianController {
    async createPhysician(req, res) {
        try {
            const { patientid } = req.params;
            const newPhysician = await database_1.default.physician.create({
                data: Object.assign(Object.assign({}, req.body), { patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "Physician created successfully",
                Physician: newPhysician,
            });
        }
        catch (error) {
            console.error("Create Physician error:", error);
            res.status(500).json({ error: "Failed to create Physician" });
        }
    }
    async getPhysicians(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const Physicians = await database_1.default.physician.findMany({
                orderBy: { createdAt: "desc" },
                where: { patientId: patientid },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.physician.count({
                where: { patientId: patientid },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                Physicians,
            });
        }
        catch (error) {
            console.error("Get Physicians error:", error);
            res.status(500).json({ error: "Failed to fetch Physicians" });
        }
    }
    async getPhysicianById(req, res) {
        try {
            const { id, patientid } = req.params;
            const physician = await database_1.default.physician.findFirst({
                where: { id, patientId: patientid },
            });
            if (!physician) {
                res.status(404).json({ error: "physician not found" });
                return;
            }
            res.status(200).json({ physician });
        }
        catch (error) {
            console.error("Get Physician error:", error);
            res.status(500).json({ error: "Failed to fetch Physician" });
        }
    }
    async updatePhysician(req, res) {
        try {
            const { id } = req.params;
            const physician = await database_1.default.physician.update({
                where: { id },
                data: Object.assign({}, req.body),
            });
            res.status(200).json({
                message: "physician updated successfully",
                physician,
            });
        }
        catch (error) {
            console.error("Update Physician error:", error);
            res.status(500).json({ error: "Failed to update Physician" });
        }
    }
    async deletePhysician(req, res) {
        try {
            const { id, patientid } = req.params;
            const Physician = await database_1.default.physician.findFirst({
                where: { id, patientId: patientid },
            });
            if (!Physician) {
                res.status(404).json({ error: "Physician not found" });
                return;
            }
            await database_1.default.physician.delete({
                where: { id },
            });
            res.status(200).json({
                message: "Physician deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete Physician error:", error);
            res.status(500).json({ error: "Failed to delete Physician" });
        }
    }
}
exports.PhysicianController = PhysicianController;
//# sourceMappingURL=physician.controller.js.map