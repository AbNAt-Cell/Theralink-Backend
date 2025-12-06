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
exports.FamilyMedicalHistoryController = void 0;
const database_1 = __importDefault(require("../config/database"));
class FamilyMedicalHistoryController {
    async createFamilyMedicalHistory(req, res) {
        try {
            const { patientid } = req.params;
            const rest = __rest(req.body, []);
            const newFamilyMedicalHistory = await database_1.default.familyMedicalHistory.create({
                data: Object.assign(Object.assign({}, rest), { patient: {
                        connect: { id: patientid },
                    } }),
            });
            return res.status(201).json({
                message: "Medical History created successfully",
                FamilymedicalHistory: newFamilyMedicalHistory,
            });
        }
        catch (error) {
            console.error("Create FamilymedicalHistory error:", error);
            return res.status(500).json({ error: "Failed to create FamilymedicalHistory" });
        }
    }
    async getFamilyMedicalHistorys(req, res) {
        const { patientid } = req.params;
        const { page = "1", limit = "10" } = req.query;
        const parsedPage = Math.max(1, parseInt(page, 10));
        const parsedLimit = Math.max(1, parseInt(limit, 10));
        try {
            const FamilyMedicalHistorys = await database_1.default.familyMedicalHistory.findMany({
                orderBy: { createdAt: "desc" },
                where: {
                    patientId: patientid,
                },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.familyMedicalHistory.count({
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
                FamilyMedicalHistorys,
            });
        }
        catch (error) {
            console.error("Get FamilyMedicalHistorys error:", error);
            return res.status(500).json({ error: "Failed to fetch FamilyMedicalHistorys" });
        }
    }
    async getFamilyMedicalHistoryById(req, res) {
        try {
            const { id, patientid } = req.params;
            const FamilymedicalHistory = await database_1.default.familyMedicalHistory.findUnique({
                where: { id, patientId: patientid },
            });
            if (!FamilymedicalHistory) {
                return res.status(404).json({ error: "FamilymedicalHistory not found" });
            }
            return res.status(200).json({ FamilymedicalHistory });
        }
        catch (error) {
            console.error("Get FamilymedicalHistory error:", error);
            return res.status(500).json({ error: "Failed to fetch FamilymedicalHistory" });
        }
    }
    async updateFamilyMedicalHistory(req, res) {
        try {
            const { id, patientid } = req.params;
            const rest = __rest(req.body, []);
            const FamilymedicalHistory = await database_1.default.familyMedicalHistory.update({
                where: { id, patientId: patientid },
                data: Object.assign({}, rest),
            });
            return res.status(200).json({
                message: "Medical History updated successfully",
                FamilymedicalHistory,
            });
        }
        catch (error) {
            console.error("Update FamilymedicalHistory error:", error);
            return res.status(500).json({ error: "Failed to update FamilymedicalHistory" });
        }
    }
    async deleteFamilyMedicalHistory(req, res) {
        try {
            const { id, patientid } = req.params;
            const FamilymedicalHistory = await database_1.default.familyMedicalHistory.findUnique({
                where: { id, patientId: patientid },
            });
            if (!FamilymedicalHistory) {
                return res.status(404).json({ error: "FamilymedicalHistory not found" });
            }
            await database_1.default.familyMedicalHistory.delete({
                where: { id, patientId: patientid },
            });
            return res.status(200).json({
                message: "Medical History deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete FamilymedicalHistory error:", error);
            return res.status(500).json({ error: "Failed to delete FamilymedicalHistory" });
        }
    }
}
exports.FamilyMedicalHistoryController = FamilyMedicalHistoryController;
//# sourceMappingURL=familyMedicalHistory.controller.js.map