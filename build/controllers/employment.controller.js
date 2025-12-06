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
exports.EmploymentController = void 0;
const database_1 = __importDefault(require("../config/database"));
class EmploymentController {
    async createEmployment(req, res) {
        try {
            const { patientid } = req.params;
            const _a = req.body, { startDate, endDate } = _a, rest = __rest(_a, ["startDate", "endDate"]);
            const newEmployment = await database_1.default.employment.create({
                data: Object.assign(Object.assign({}, rest), { startDate: new Date(startDate), endDate: new Date(endDate), patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "Employment created successfully",
                Employment: newEmployment,
            });
        }
        catch (error) {
            console.error("Create Employment error:", error);
            res.status(500).json({ error: "Failed to create Employment" });
        }
    }
    async getEmployments(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const Employment = await database_1.default.employment.findMany({
                orderBy: { createdAt: "desc" },
                where: { patientId: patientid },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.employment.count({
                where: { patientId: patientid },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                Employment,
            });
        }
        catch (error) {
            console.error("Get Employments error:", error);
            res.status(500).json({ error: "Failed to fetch Employments" });
        }
    }
    async getEmploymentById(req, res) {
        try {
            const { id, patientid } = req.params;
            const Employment = await database_1.default.employment.findFirst({
                where: { id, patientId: patientid },
            });
            if (!Employment) {
                res.status(404).json({ error: "Employment not found" });
                return;
            }
            res.status(200).json({ Employment });
        }
        catch (error) {
            console.error("Get Employment error:", error);
            res.status(500).json({ error: "Failed to fetch Employment" });
        }
    }
    async updateEmployment(req, res) {
        try {
            const { id } = req.params;
            const _a = req.body, { startDate, endDate } = _a, rest = __rest(_a, ["startDate", "endDate"]);
            const Employment = await database_1.default.employment.update({
                where: { id },
                data: Object.assign(Object.assign({}, rest), { startDate: new Date(startDate), endDate: new Date(endDate) }),
            });
            res.status(200).json({
                message: "Employment updated successfully",
                Employment,
            });
        }
        catch (error) {
            console.error("Update Employment error:", error);
            res.status(500).json({ error: "Failed to update Employment" });
        }
    }
    async deleteEmployment(req, res) {
        try {
            const { id, patientid } = req.params;
            const Employment = await database_1.default.employment.findFirst({
                where: { id, patientId: patientid },
            });
            if (!Employment) {
                res.status(404).json({ error: "Employment not found" });
                return;
            }
            await database_1.default.employment.delete({
                where: { id },
            });
            res.status(200).json({
                message: "Employment deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete Employment error:", error);
            res.status(500).json({ error: "Failed to delete Employment" });
        }
    }
}
exports.EmploymentController = EmploymentController;
//# sourceMappingURL=employment.controller.js.map