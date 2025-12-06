"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalHistoryController = void 0;
const database_1 = __importDefault(require("../config/database"));
class MedicalHistoryController {
    async createMedicalHistory(req, res) {
        try {
            const { patientid } = req.params;
            const _a = req.body, { date } = _a, rest = __rest(_a, ["date"]);
            const newMedicalHistory = await database_1.default.medicalHistory.create({
                data: Object.assign(Object.assign({}, rest), { date: new Date(date), patient: {
                        connect: { id: patientid },
                    } }),
            });
            return res.status(201).json({
                message: "Medical History created successfully",
                medicalHistory: newMedicalHistory,
            });
        }
        catch (error) {
            console.error("Create medicalHistory error:", error);
            return res.status(500).json({ error: "Failed to create medicalHistory" });
        }
    }
    async getMedicalHistorys(req, res) {
        const { patientid } = req.params;
        const { page = "1", limit = "10" } = req.query;
        const parsedPage = Math.max(1, parseInt(page, 10));
        const parsedLimit = Math.max(1, parseInt(limit, 10));
        try {
            const MedicalHistorys = await database_1.default.medicalHistory.findMany({
                orderBy: { createdAt: "desc" },
                where: {
                    patientId: patientid,
                },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.medicalHistory.count({
                where: {
                    patientId: patientid,
                },
            });
            return res
                .status(200)
                .json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                MedicalHistorys,
            });
        }
        catch (error) {
            console.error("Get MedicalHistorys error:", error);
            return res.status(500).json({ error: "Failed to fetch MedicalHistorys" });
        }
    }
    async getMedicalHistoryById(req, res) {
        try {
            const { id, patientid } = req.params;
            const medicalHistory = await database_1.default.medicalHistory.findUnique({
                where: { id, patientId: patientid },
            });
            if (!medicalHistory) {
                return res.status(404).json({ error: "medicalHistory not found" });
            }
            return res.status(200).json({ medicalHistory });
        }
        catch (error) {
            console.error("Get medicalHistory error:", error);
            return res.status(500).json({ error: "Failed to fetch medicalHistory" });
        }
    }
    async updateMedicalHistory(req, res) {
        try {
            const { id, patientid } = req.params;
            const _a = req.body, { date } = _a, rest = __rest(_a, ["date"]);
            const medicalHistory = await database_1.default.medicalHistory.update({
                where: { id, patientId: patientid },
                data: Object.assign(Object.assign({}, rest), { date: new Date(date) }),
            });
            return res.status(200).json({
                message: "Medical History updated successfully",
                medicalHistory,
            });
        }
        catch (error) {
            console.error("Update medicalHistory error:", error);
            return res.status(500).json({ error: "Failed to update medicalHistory" });
        }
    }
    async deleteMedicalHistory(req, res) {
        try {
            const { id, patientid } = req.params;
            const medicalHistory = await database_1.default.medicalHistory.findUnique({
                where: { id, patientId: patientid },
            });
            if (!medicalHistory) {
                return res.status(404).json({ error: "medicalHistory not found" });
            }
            await database_1.default.medicalHistory.delete({
                where: { id, patientId: patientid },
            });
            return res.status(200).json({
                message: "Medical History deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete medicalHistory error:", error);
            return res.status(500).json({ error: "Failed to delete medicalHistory" });
        }
    }
}
exports.MedicalHistoryController = MedicalHistoryController;
//# sourceMappingURL=medicalHistory.controller.js.map