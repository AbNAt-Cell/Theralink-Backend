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
exports.PatientFileController = void 0;
const database_1 = __importDefault(require("../config/database"));
class PatientFileController {
    async createPatientFile(req, res) {
        try {
            const { patientid } = req.params;
            const rest = __rest(req.body, []);
            const newPatientFile = await database_1.default.patientFile.create({
                data: Object.assign(Object.assign({}, rest), { patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "patientFile created successfully",
                patientFile: newPatientFile,
            });
        }
        catch (error) {
            console.error("Create patientFile error:", error);
            res.status(500).json({ error: "Failed to create patientFile" });
        }
    }
    async getPatientFiles(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const patientFile = await database_1.default.patientFile.findMany({
                orderBy: { createdAt: "desc" },
                where: { patientId: patientid },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.patientFile.count({
                where: { patientId: patientid },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                patientFile,
            });
        }
        catch (error) {
            console.error("Get PatientFiles error:", error);
            res.status(500).json({ error: "Failed to fetch PatientFiles" });
        }
    }
    async getPatientFileById(req, res) {
        try {
            const { id, patientid } = req.params;
            const patientFile = await database_1.default.patientFile.findFirst({
                where: { id, patientId: patientid },
            });
            if (!patientFile) {
                res.status(404).json({ error: "patientFile not found" });
                return;
            }
            res.status(200).json({ patientFile });
        }
        catch (error) {
            console.error("Get patientFile error:", error);
            res.status(500).json({ error: "Failed to fetch patientFile" });
        }
    }
    async updatePatientFile(req, res) {
        try {
            const { id } = req.params;
            const rest = __rest(req.body, []);
            const patientFile = await database_1.default.patientFile.update({
                where: { id },
                data: Object.assign({}, rest),
            });
            res.status(200).json({
                message: "patientFile updated successfully",
                patientFile,
            });
        }
        catch (error) {
            console.error("Update patientFile error:", error);
            res.status(500).json({ error: "Failed to update patientFile" });
        }
    }
    async deletePatientFile(req, res) {
        try {
            const { id, patientid } = req.params;
            const patientFile = await database_1.default.patientFile.findFirst({
                where: { id, patientId: patientid },
            });
            if (!patientFile) {
                res.status(404).json({ error: "patientFile not found" });
                return;
            }
            await database_1.default.patientFile.delete({
                where: { id },
            });
            res.status(200).json({
                message: "patientFile deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete patientFile error:", error);
            res.status(500).json({ error: "Failed to delete patientFile" });
        }
    }
}
exports.PatientFileController = PatientFileController;
//# sourceMappingURL=patientFile.controller.js.map