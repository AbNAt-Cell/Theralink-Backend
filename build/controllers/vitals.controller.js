"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VitalController = void 0;
const database_1 = __importDefault(require("../config/database"));
class VitalController {
    async createVital(req, res) {
        try {
            const { patientid } = req.params;
            const newVital = await database_1.default.vitals.create({
                data: Object.assign(Object.assign({}, req.body), { patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "vital created successfully",
                vital: newVital,
            });
        }
        catch (error) {
            console.error("Create vital error:", error);
            res.status(500).json({ error: "Failed to create vital" });
        }
    }
    async getVitals(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const Vitals = await database_1.default.vitals.findMany({
                orderBy: { createdAt: "desc" },
                where: { patientId: patientid },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.vitals.count({
                where: { patientId: patientid },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                Vitals,
            });
        }
        catch (error) {
            console.error("Get Vitals error:", error);
            res.status(500).json({ error: "Failed to fetch Vitals" });
        }
    }
    async getVitalById(req, res) {
        try {
            const { id, patientid } = req.params;
            const vital = await database_1.default.vitals.findFirst({
                where: { id, patientId: patientid },
            });
            if (!vital) {
                res.status(404).json({ error: "vital not found" });
                return;
            }
            res.status(200).json({ vital });
        }
        catch (error) {
            console.error("Get vital error:", error);
            res.status(500).json({ error: "Failed to fetch vital" });
        }
    }
    async updateVital(req, res) {
        try {
            const { id } = req.params;
            const vital = await database_1.default.vitals.update({
                where: { id },
                data: Object.assign({}, req.body),
            });
            res.status(200).json({
                message: "vital updated successfully",
                vital,
            });
        }
        catch (error) {
            console.error("Update vital error:", error);
            res.status(500).json({ error: "Failed to update vital" });
        }
    }
    async deleteVital(req, res) {
        try {
            const { id, patientid } = req.params;
            const vital = await database_1.default.vitals.findFirst({
                where: { id, patientId: patientid },
            });
            if (!vital) {
                res.status(404).json({ error: "vital not found" });
                return;
            }
            await database_1.default.vitals.delete({
                where: { id },
            });
            res.status(200).json({
                message: "vital deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete vital error:", error);
            res.status(500).json({ error: "Failed to delete vital" });
        }
    }
}
exports.VitalController = VitalController;
//# sourceMappingURL=vitals.controller.js.map