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
exports.EligibilityController = void 0;
const database_1 = __importDefault(require("../config/database"));
class EligibilityController {
    async checkEligibility(req, res) {
        try {
            const { patientid } = req.params;
            const _a = req.body, { startDate, endDate } = _a, rest = __rest(_a, ["startDate", "endDate"]);
            const newEligibility = await database_1.default.insurance.create({
                data: Object.assign(Object.assign({}, rest), { startDate: new Date(startDate), endDate: new Date(endDate), patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "Eligibility created successfully",
                insurance: newEligibility,
            });
        }
        catch (error) {
            console.error("Create Eligibility error:", error);
            res.status(500).json({ error: "Failed to create Eligibility" });
        }
    }
    async getEligibilitys(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const insurance = await database_1.default.insurance.findMany({
                orderBy: { createdAt: "desc" },
                where: { patientId: patientid },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.insurance.count({
                where: { patientId: patientid },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                insurance,
            });
        }
        catch (error) {
            console.error("Get insurance error:", error);
            res.status(500).json({ error: "Failed to fetch Eligibilitys" });
        }
    }
    async getEligibilityById(req, res) {
        try {
            const { id, patientid } = req.params;
            const insurance = await database_1.default.insurance.findFirst({
                where: { id, patientId: patientid },
            });
            if (!insurance) {
                res.status(404).json({ error: "Eligibility not found" });
                return;
            }
            res.status(200).json({ insurance });
        }
        catch (error) {
            console.error("Get Eligibility error:", error);
            res.status(500).json({ error: "Failed to fetch Eligibility" });
        }
    }
    async updateEligibility(req, res) {
        try {
            const { id } = req.params;
            const _a = req.body, { startDate, endDate } = _a, rest = __rest(_a, ["startDate", "endDate"]);
            const insurance = await database_1.default.insurance.update({
                where: { id },
                data: Object.assign(Object.assign({}, rest), { startDate: new Date(startDate), endDate: new Date(endDate) }),
            });
            res.status(200).json({
                message: "Eligibility updated successfully",
                insurance,
            });
        }
        catch (error) {
            console.error("Update Eligibility error:", error);
            res.status(500).json({ error: "Failed to update Eligibility" });
        }
    }
    async deleteEligibility(req, res) {
        try {
            const { id, patientid } = req.params;
            const insurance = await database_1.default.insurance.findFirst({
                where: { id, patientId: patientid },
            });
            if (!insurance) {
                res.status(404).json({ error: "insurance not found" });
                return;
            }
            await database_1.default.insurance.delete({
                where: { id },
            });
            res.status(200).json({
                message: "Eligibility deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete Eligibility error:", error);
            res.status(500).json({ error: "Failed to delete Eligibility" });
        }
    }
}
exports.EligibilityController = EligibilityController;
//# sourceMappingURL=eligibility.controller.js.map