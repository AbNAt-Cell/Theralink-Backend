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
exports.MedicationController = void 0;
const database_1 = __importDefault(require("../config/database"));
class MedicationController {
    async createMedication(req, res) {
        try {
            const { patientid } = req.params;
            const _a = req.body, { startDate, endDate } = _a, rest = __rest(_a, ["startDate", "endDate"]);
            const newMedication = await database_1.default.medication.create({
                data: Object.assign(Object.assign({}, rest), { startDate: new Date(startDate), endDate: new Date(endDate), patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "Medication created successfully",
                Medication: newMedication,
            });
        }
        catch (error) {
            console.error("Create Medication error:", error);
            res.status(500).json({ error: "Failed to create Medication" });
        }
    }
    async getMedications(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const Medications = await database_1.default.medication.findMany({
                orderBy: { createdAt: "desc" },
                where: { patientId: patientid },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.medication.count({
                where: { patientId: patientid },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                Medications,
            });
        }
        catch (error) {
            console.error("Get Medications error:", error);
            res.status(500).json({ error: "Failed to fetch Medications" });
        }
    }
    async getMedicationById(req, res) {
        try {
            const { id, patientid } = req.params;
            const Medication = await database_1.default.medication.findFirst({
                where: { id, patientId: patientid },
            });
            if (!Medication) {
                res.status(404).json({ error: "Medication not found" });
                return;
            }
            res.status(200).json({ Medication });
        }
        catch (error) {
            console.error("Get Medication error:", error);
            res.status(500).json({ error: "Failed to fetch Medication" });
        }
    }
    async updateMedication(req, res) {
        try {
            const { id } = req.params;
            const _a = req.body, { startDate, endDate } = _a, rest = __rest(_a, ["startDate", "endDate"]);
            const Medication = await database_1.default.medication.update({
                where: { id },
                data: Object.assign(Object.assign({}, rest), { startDate: new Date(startDate), endDate: new Date(endDate) }),
            });
            res.status(200).json({
                message: "Medication updated successfully",
                Medication,
            });
        }
        catch (error) {
            console.error("Update Medication error:", error);
            res.status(500).json({ error: "Failed to update Medication" });
        }
    }
    async deleteMedication(req, res) {
        try {
            const { id, patientid } = req.params;
            const Medication = await database_1.default.medication.findFirst({
                where: { id, patientId: patientid },
            });
            if (!Medication) {
                res.status(404).json({ error: "Medication not found" });
                return;
            }
            await database_1.default.medication.delete({
                where: { id },
            });
            res.status(200).json({
                message: "Medication deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete Medication error:", error);
            res.status(500).json({ error: "Failed to delete Medication" });
        }
    }
}
exports.MedicationController = MedicationController;
//# sourceMappingURL=medication.controller.js.map