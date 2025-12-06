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
exports.TreatmentObjectiveController = void 0;
const database_1 = __importDefault(require("../config/database"));
class TreatmentObjectiveController {
    async createTreatmentObjective(req, res) {
        try {
            const { treatmentgoalsId } = req.params;
            const _a = req.body, { startDate, endDate, targetDate } = _a, rest = __rest(_a, ["startDate", "endDate", "targetDate"]);
            const newTreatmentObjective = await database_1.default.treatmentObjective.create({
                data: Object.assign(Object.assign({}, rest), { startDate: new Date(startDate), endDate: new Date(endDate), targetDate: new Date(targetDate), treatmentgoals: {
                        connect: { id: treatmentgoalsId },
                    } }),
            });
            res.status(201).json({
                message: "TreatmentObjective created successfully",
                TreatmentObjective: newTreatmentObjective,
            });
        }
        catch (error) {
            console.error("Create TreatmentObjective error:", error);
            res.status(500).json({ error: "Failed to create TreatmentObjective" });
        }
    }
    async getTreatmentObjectives(req, res) {
        try {
            const { treatmentgoalsId } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const TreatmentObjectives = await database_1.default.treatmentObjective.findMany({
                orderBy: { createdAt: "desc" },
                where: { treatmentgoalsId: treatmentgoalsId },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.treatmentObjective.count({
                where: { treatmentgoalsId: treatmentgoalsId },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                TreatmentObjectives,
            });
        }
        catch (error) {
            console.error("Get TreatmentObjectives error:", error);
            res.status(500).json({ error: "Failed to fetch TreatmentObjectives" });
        }
    }
    async getTreatmentObjectiveById(req, res) {
        try {
            const { id, treatmentgoalsId } = req.params;
            const TreatmentObjective = await database_1.default.treatmentObjective.findFirst({
                where: { id, treatmentgoalsId: treatmentgoalsId },
            });
            if (!TreatmentObjective) {
                res.status(404).json({ error: "TreatmentObjective not found" });
                return;
            }
            res.status(200).json({ TreatmentObjective });
        }
        catch (error) {
            console.error("Get TreatmentObjective error:", error);
            res.status(500).json({ error: "Failed to fetch TreatmentObjective" });
        }
    }
    async updateTreatmentObjective(req, res) {
        try {
            const { id } = req.params;
            const _a = req.body, { startDate, endDate, targetDate } = _a, rest = __rest(_a, ["startDate", "endDate", "targetDate"]);
            const TreatmentObjective = await database_1.default.treatmentObjective.update({
                where: { id },
                data: Object.assign(Object.assign({}, rest), { startDate: new Date(startDate), endDate: new Date(endDate), targetDate: new Date(targetDate) }),
            });
            res.status(200).json({
                message: "TreatmentObjective updated successfully",
                TreatmentObjective,
            });
        }
        catch (error) {
            console.error("Update TreatmentObjective error:", error);
            res.status(500).json({ error: "Failed to update TreatmentObjective" });
        }
    }
    async deleteTreatmentObjective(req, res) {
        try {
            const { id, treatmentgoalsId } = req.params;
            const TreatmentObjective = await database_1.default.treatmentObjective.findFirst({
                where: { id, treatmentgoalsId: treatmentgoalsId },
            });
            if (!TreatmentObjective) {
                res.status(404).json({ error: "TreatmentObjective not found" });
                return;
            }
            await database_1.default.treatmentObjective.delete({
                where: { id },
            });
            res.status(200).json({
                message: "TreatmentObjective deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete TreatmentObjective error:", error);
            res.status(500).json({ error: "Failed to delete TreatmentObjective" });
        }
    }
}
exports.TreatmentObjectiveController = TreatmentObjectiveController;
//# sourceMappingURL=treatmentObjective.controller.js.map