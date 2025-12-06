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
exports.DischargeController = void 0;
const database_1 = __importDefault(require("../config/database"));
class DischargeController {
    async createDischarge(req, res) {
        try {
            const { patientid } = req.params;
            const _a = req.body, { dischargeDate } = _a, rest = __rest(_a, ["dischargeDate"]);
            const newDischarge = await database_1.default.discharge.create({
                data: Object.assign(Object.assign({}, rest), { dischargeDate: new Date(dischargeDate), patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "Discharge created successfully",
                Discharge: newDischarge,
            });
        }
        catch (error) {
            console.error("Create Discharge error:", error);
            res.status(500).json({ error: "Failed to create Discharge" });
        }
    }
    async getDischarges(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const Discharge = await database_1.default.discharge.findMany({
                orderBy: { createdAt: "desc" },
                where: { patientId: patientid },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.discharge.count({
                where: { patientId: patientid },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                Discharge,
            });
        }
        catch (error) {
            console.error("Get Discharges error:", error);
            res.status(500).json({ error: "Failed to fetch Discharges" });
        }
    }
    async getDischargeById(req, res) {
        try {
            const { id, patientid } = req.params;
            const Discharge = await database_1.default.discharge.findFirst({
                where: { id, patientId: patientid },
            });
            if (!Discharge) {
                res.status(404).json({ error: "Discharge not found" });
                return;
            }
            res.status(200).json({ Discharge });
        }
        catch (error) {
            console.error("Get Discharge error:", error);
            res.status(500).json({ error: "Failed to fetch Discharge" });
        }
    }
    async updateDischarge(req, res) {
        try {
            const { id } = req.params;
            const _a = req.body, { dischargeDate } = _a, rest = __rest(_a, ["dischargeDate"]);
            const Discharge = await database_1.default.discharge.update({
                where: { id },
                data: Object.assign({ dischargeDate: new Date(dischargeDate) }, rest),
            });
            res.status(200).json({
                message: "Discharge updated successfully",
                Discharge,
            });
        }
        catch (error) {
            console.error("Update Discharge error:", error);
            res.status(500).json({ error: "Failed to update Discharge" });
        }
    }
    async deleteDischarge(req, res) {
        try {
            const { id, patientid } = req.params;
            const Discharge = await database_1.default.discharge.findFirst({
                where: { id, patientId: patientid },
            });
            if (!Discharge) {
                res.status(404).json({ error: "Discharge not found" });
                return;
            }
            await database_1.default.discharge.delete({
                where: { id },
            });
            res.status(200).json({
                message: "Discharge deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete Discharge error:", error);
            res.status(500).json({ error: "Failed to delete Discharge" });
        }
    }
}
exports.DischargeController = DischargeController;
//# sourceMappingURL=discharge.controller.js.map