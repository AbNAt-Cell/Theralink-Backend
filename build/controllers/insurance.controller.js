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
exports.InsuranceController = void 0;
const database_1 = __importDefault(require("../config/database"));
class InsuranceController {
    async createInsurance(req, res) {
        try {
            const { patientid } = req.params;
            const _a = req.body, { startDate, endDate } = _a, rest = __rest(_a, ["startDate", "endDate"]);
            const newInsurance = await database_1.default.insurance.create({
                data: Object.assign(Object.assign({}, rest), { startDate: new Date(startDate), endDate: new Date(endDate), patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "Insurance created successfully",
                insurance: newInsurance,
            });
        }
        catch (error) {
            console.error("Create Insurance error:", error);
            res.status(500).json({ error: "Failed to create Insurance" });
        }
    }
    async getInsurances(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const insurances = await database_1.default.insurance.findMany({
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
                insurances,
            });
        }
        catch (error) {
            console.error("Get Insurances error:", error);
            res.status(500).json({ error: "Failed to fetch Insurances" });
        }
    }
    async getInsuranceById(req, res) {
        try {
            const { id, patientid } = req.params;
            const insurance = await database_1.default.insurance.findFirst({
                where: { id, patientId: patientid },
            });
            if (!insurance) {
                res.status(404).json({ error: "Insurance not found" });
                return;
            }
            res.status(200).json({ insurance });
        }
        catch (error) {
            console.error("Get Insurance error:", error);
            res.status(500).json({ error: "Failed to fetch Insurance" });
        }
    }
    async updateInsurance(req, res) {
        try {
            const { id } = req.params;
            const _a = req.body, { startDate, endDate } = _a, rest = __rest(_a, ["startDate", "endDate"]);
            const insurance = await database_1.default.insurance.update({
                where: { id },
                data: Object.assign(Object.assign({}, rest), { startDate: new Date(startDate), endDate: new Date(endDate) }),
            });
            res.status(200).json({
                message: "Insurance updated successfully",
                insurance,
            });
        }
        catch (error) {
            console.error("Update Insurance error:", error);
            res.status(500).json({ error: "Failed to update Insurance" });
        }
    }
    async deleteInsurance(req, res) {
        try {
            const { id, patientid } = req.params;
            const insurance = await database_1.default.insurance.findFirst({
                where: { id, patientId: patientid },
            });
            if (!insurance) {
                res.status(404).json({ error: "Insurance not found" });
                return;
            }
            await database_1.default.insurance.delete({
                where: { id },
            });
            res.status(200).json({
                message: "Insurance deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete Insurance error:", error);
            res.status(500).json({ error: "Failed to delete Insurance" });
        }
    }
}
exports.InsuranceController = InsuranceController;
//# sourceMappingURL=insurance.controller.js.map