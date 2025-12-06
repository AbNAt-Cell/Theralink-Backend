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
exports.TreatmentPlanController = void 0;
const database_1 = __importDefault(require("../config/database"));
class TreatmentPlanController {
    async createTreatmentPlan(req, res) {
        try {
            const { patientid } = req.params;
            const _a = req.body, { startDate, endDate } = _a, rest = __rest(_a, ["startDate", "endDate"]);
            const newTreatmentPlan = await database_1.default.treatmentPlan.create({
                data: Object.assign(Object.assign({}, rest), { startDate: new Date(startDate), endDate: new Date(endDate), patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "TreatmentPlan created successfully",
                TreatmentPlan: newTreatmentPlan,
            });
        }
        catch (error) {
            console.error("Create TreatmentPlan error:", error);
            res.status(500).json({ error: "Failed to create TreatmentPlan" });
        }
    }
    async getTreatmentPlans(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const TreatmentPlans = await database_1.default.treatmentPlan.findMany({
                orderBy: { createdAt: "desc" },
                where: { patientId: patientid },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.treatmentPlan.count({
                where: { patientId: patientid },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                TreatmentPlans,
            });
        }
        catch (error) {
            console.error("Get TreatmentPlans error:", error);
            res.status(500).json({ error: "Failed to fetch TreatmentPlans" });
        }
    }
    async getTreatmentPlanById(req, res) {
        try {
            const { id, patientid } = req.params;
            const TreatmentPlan = await database_1.default.treatmentPlan.findFirst({
                where: { id, patientId: patientid },
            });
            if (!TreatmentPlan) {
                res.status(404).json({ error: "TreatmentPlan not found" });
                return;
            }
            res.status(200).json({ TreatmentPlan });
        }
        catch (error) {
            console.error("Get TreatmentPlan error:", error);
            res.status(500).json({ error: "Failed to fetch TreatmentPlan" });
        }
    }
    async updateTreatmentPlan(req, res) {
        try {
            const { id } = req.params;
            const _a = req.body, { startDate, endDate } = _a, rest = __rest(_a, ["startDate", "endDate"]);
            const TreatmentPlan = await database_1.default.treatmentPlan.update({
                where: { id },
                data: Object.assign(Object.assign({}, rest), { startDate: new Date(startDate), endDate: new Date(endDate) }),
            });
            res.status(200).json({
                message: "TreatmentPlan updated successfully",
                TreatmentPlan,
            });
        }
        catch (error) {
            console.error("Update TreatmentPlan error:", error);
            res.status(500).json({ error: "Failed to update TreatmentPlan" });
        }
    }
    async deleteTreatmentPlan(req, res) {
        try {
            const { id, patientid } = req.params;
            const TreatmentPlan = await database_1.default.treatmentPlan.findFirst({
                where: { id, patientId: patientid },
            });
            if (!TreatmentPlan) {
                res.status(404).json({ error: "TreatmentPlan not found" });
                return;
            }
            await database_1.default.treatmentPlan.delete({
                where: { id },
            });
            res.status(200).json({
                message: "TreatmentPlan deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete TreatmentPlan error:", error);
            res.status(500).json({ error: "Failed to delete TreatmentPlan" });
        }
    }
}
exports.TreatmentPlanController = TreatmentPlanController;
//# sourceMappingURL=treatmentPlan.controller.js.map