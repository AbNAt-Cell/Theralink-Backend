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
exports.DiagnosisController = void 0;
const database_1 = __importDefault(require("../config/database"));
class DiagnosisController {
    async createDiagnosis(req, res) {
        try {
            const { patientid } = req.params;
            const _a = req.body, { diagnosisDate } = _a, rest = __rest(_a, ["diagnosisDate"]);
            const newDiagnosis = await database_1.default.diagnosis.create({
                data: Object.assign(Object.assign({}, rest), { diagnosisDate: new Date(diagnosisDate), patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "Diagnosis created successfully",
                Diagnosis: newDiagnosis,
            });
        }
        catch (error) {
            console.error("Create Diagnosis error:", error);
            res.status(500).json({ error: "Failed to create Diagnosis" });
        }
    }
    async getDiagnosis(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const diagnosis = await database_1.default.diagnosis.findMany({
                orderBy: { createdAt: "desc" },
                where: { patientId: patientid },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.diagnosis.count({
                where: { patientId: patientid },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                diagnosis,
            });
        }
        catch (error) {
            console.error("Get Diagnosiss error:", error);
            res.status(500).json({ error: "Failed to fetch Diagnosiss" });
        }
    }
    async getDiagnosisById(req, res) {
        try {
            const { id, patientid } = req.params;
            const Diagnosis = await database_1.default.diagnosis.findFirst({
                where: { id, patientId: patientid },
            });
            if (!Diagnosis) {
                res.status(404).json({ error: "Diagnosis not found" });
                return;
            }
            res.status(200).json({ Diagnosis });
        }
        catch (error) {
            console.error("Get Diagnosis error:", error);
            res.status(500).json({ error: "Failed to fetch Diagnosis" });
        }
    }
    async updateDiagnosis(req, res) {
        try {
            const { id } = req.params;
            const _a = req.body, { diagnosisDate } = _a, rest = __rest(_a, ["diagnosisDate"]);
            const Diagnosis = await database_1.default.diagnosis.update({
                where: { id },
                data: Object.assign(Object.assign({}, rest), { diagnosisDate: new Date(diagnosisDate) }),
            });
            res.status(200).json({
                message: "Diagnosis updated successfully",
                Diagnosis,
            });
        }
        catch (error) {
            console.error("Update Diagnosis error:", error);
            res.status(500).json({ error: "Failed to update Diagnosis" });
        }
    }
    async deleteDiagnosis(req, res) {
        try {
            const { id, patientid } = req.params;
            const Diagnosis = await database_1.default.diagnosis.findFirst({
                where: { id, patientId: patientid },
            });
            if (!Diagnosis) {
                res.status(404).json({ error: "Diagnosis not found" });
                return;
            }
            await database_1.default.diagnosis.delete({
                where: { id },
            });
            res.status(200).json({
                message: "Diagnosis deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete Diagnosis error:", error);
            res.status(500).json({ error: "Failed to delete Diagnosis" });
        }
    }
}
exports.DiagnosisController = DiagnosisController;
//# sourceMappingURL=diagnosis.controller.js.map