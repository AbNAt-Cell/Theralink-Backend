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
exports.TreatmentInterventionController = void 0;
const database_1 = __importDefault(require("../config/database"));
class TreatmentInterventionController {
    async createTreatmentIntervention(req, res) {
        try {
            const { treatmentobjectiveId } = req.params;
            const rest = __rest(req.body, []);
            const newTreatmentIntervention = await database_1.default.treatmentIntervention.create({
                data: Object.assign(Object.assign({}, rest), { treatmentobjective: {
                        connect: { id: treatmentobjectiveId },
                    } }),
            });
            res.status(201).json({
                message: "TreatmentIntervention created successfully",
                TreatmentIntervention: newTreatmentIntervention,
            });
        }
        catch (error) {
            console.error("Create TreatmentIntervention error:", error);
            res.status(500).json({ error: "Failed to create TreatmentIntervention" });
        }
    }
    async getTreatmentInterventions(req, res) {
        try {
            const { treatmentobjectiveId } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const TreatmentInterventions = await database_1.default.treatmentIntervention.findMany({
                orderBy: { createdAt: "desc" },
                where: { treatmentobjectiveId: treatmentobjectiveId },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.treatmentIntervention.count({
                where: { treatmentobjectiveId: treatmentobjectiveId },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                TreatmentInterventions,
            });
        }
        catch (error) {
            console.error("Get TreatmentInterventions error:", error);
            res.status(500).json({ error: "Failed to fetch TreatmentInterventions" });
        }
    }
    async getTreatmentInterventionById(req, res) {
        try {
            const { id, treatmentobjectiveId } = req.params;
            const TreatmentIntervention = await database_1.default.treatmentIntervention.findFirst({
                where: { id, treatmentobjectiveId: treatmentobjectiveId },
            });
            if (!TreatmentIntervention) {
                res.status(404).json({ error: "TreatmentIntervention not found" });
                return;
            }
            res.status(200).json({ TreatmentIntervention });
        }
        catch (error) {
            console.error("Get TreatmentIntervention error:", error);
            res.status(500).json({ error: "Failed to fetch TreatmentIntervention" });
        }
    }
    async updateTreatmentIntervention(req, res) {
        try {
            const { id } = req.params;
            const rest = __rest(req.body, []);
            const TreatmentIntervention = await database_1.default.treatmentIntervention.update({
                where: { id },
                data: Object.assign({}, rest),
            });
            res.status(200).json({
                message: "TreatmentIntervention updated successfully",
                TreatmentIntervention,
            });
        }
        catch (error) {
            console.error("Update TreatmentIntervention error:", error);
            res.status(500).json({ error: "Failed to update TreatmentIntervention" });
        }
    }
    async deleteTreatmentIntervention(req, res) {
        try {
            const { id, treatmentobjectiveId } = req.params;
            const TreatmentIntervention = await database_1.default.treatmentIntervention.findFirst({
                where: { id, treatmentobjectiveId: treatmentobjectiveId },
            });
            if (!TreatmentIntervention) {
                res.status(404).json({ error: "TreatmentIntervention not found" });
                return;
            }
            await database_1.default.treatmentIntervention.delete({
                where: { id },
            });
            res.status(200).json({
                message: "TreatmentIntervention deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete TreatmentIntervention error:", error);
            res.status(500).json({ error: "Failed to delete TreatmentIntervention" });
        }
    }
}
exports.TreatmentInterventionController = TreatmentInterventionController;
//# sourceMappingURL=treatmentIntervention.controller.js.map