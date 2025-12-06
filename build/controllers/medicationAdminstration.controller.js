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
exports.MedicationAdminstrationController = void 0;
const database_1 = __importDefault(require("../config/database"));
class MedicationAdminstrationController {
    async createMedicationAdminstration(req, res) {
        try {
            const { patientid } = req.params;
            const _a = req.body, { administeredDate } = _a, rest = __rest(_a, ["administeredDate"]);
            const newMedicationAdminstration = await database_1.default.medicationAdminstration.create({
                data: Object.assign(Object.assign({}, rest), { administeredDate: new Date(administeredDate), patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "Medication Adminstration created successfully",
                MedicationAdminstration: newMedicationAdminstration,
            });
        }
        catch (error) {
            console.error("Create MedicationAdminstration error:", error);
            res
                .status(500)
                .json({ error: "Failed to create MedicationAdminstration" });
        }
    }
    async getMedicationAdminstrations(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const MedicationAdminstrations = await database_1.default.medicationAdminstration.findMany({
                orderBy: { createdAt: "desc" },
                where: { patientId: patientid },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.medicationAdminstration.count({
                where: { patientId: patientid },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                MedicationAdminstrations,
            });
        }
        catch (error) {
            console.error("Get Medication Adminstrations error:", error);
            res
                .status(500)
                .json({ error: "Failed to fetch Medication Adminstrations" });
        }
    }
    async getMedicationAdminstrationById(req, res) {
        try {
            const { id, patientid } = req.params;
            const MedicationAdminstration = await database_1.default.medicationAdminstration.findFirst({
                where: { id, patientId: patientid },
            });
            if (!MedicationAdminstration) {
                res.status(404).json({ error: "Medication Adminstration not found" });
                return;
            }
            res.status(200).json({ MedicationAdminstration });
        }
        catch (error) {
            console.error("Get MedicationAdminstration error:", error);
            res
                .status(500)
                .json({ error: "Failed to fetch Medication Adminstration" });
        }
    }
    async updateMedicationAdminstration(req, res) {
        try {
            const { id } = req.params;
            const _a = req.body, { administeredDate } = _a, rest = __rest(_a, ["administeredDate"]);
            const MedicationAdminstration = await database_1.default.medicationAdminstration.update({
                where: { id },
                data: Object.assign(Object.assign({}, rest), { administeredDate: new Date(administeredDate) }),
            });
            res.status(200).json({
                message: "Medication Adminstration updated successfully",
                MedicationAdminstration,
            });
        }
        catch (error) {
            console.error("Update MedicationAdminstration error:", error);
            res
                .status(500)
                .json({ error: "Failed to update Medication Adminstration" });
        }
    }
    async deleteMedicationAdminstration(req, res) {
        try {
            const { id, patientid } = req.params;
            const MedicationAdminstration = await database_1.default.medicationAdminstration.findFirst({
                where: { id, patientId: patientid },
            });
            if (!MedicationAdminstration) {
                res.status(404).json({ error: "Medication Adminstration not found" });
                return;
            }
            await database_1.default.medicationAdminstration.delete({
                where: { id },
            });
            res.status(200).json({
                message: "MedicationAdminstration deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete Medication Adminstration error:", error);
            res
                .status(500)
                .json({ error: "Failed to delete Medication Adminstration" });
        }
    }
}
exports.MedicationAdminstrationController = MedicationAdminstrationController;
//# sourceMappingURL=medicationAdminstration.controller.js.map