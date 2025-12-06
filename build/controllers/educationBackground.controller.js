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
exports.EducationBackgroundController = void 0;
const database_1 = __importDefault(require("../config/database"));
class EducationBackgroundController {
    async createEducationBackground(req, res) {
        try {
            const { patientid } = req.params;
            const rest = __rest(req.body, []);
            const newEducationBackground = await database_1.default.educationBackground.create({
                data: Object.assign(Object.assign({}, rest), { patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "Education Background created successfully",
                EducationBackground: newEducationBackground,
            });
        }
        catch (error) {
            console.error("Create EducationBackground error:", error);
            res.status(500).json({ error: "Failed to create EducationBackground" });
        }
    }
    async getEducationBackgrounds(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const EducationBackground = await database_1.default.educationBackground.findMany({
                orderBy: { createdAt: "desc" },
                where: { patientId: patientid },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.educationBackground.count({
                where: { patientId: patientid },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                EducationBackground,
            });
        }
        catch (error) {
            console.error("Get EducationBackgrounds error:", error);
            res.status(500).json({ error: "Failed to fetch EducationBackgrounds" });
        }
    }
    async getEducationBackgroundById(req, res) {
        try {
            const { id, patientid } = req.params;
            const EducationBackground = await database_1.default.educationBackground.findFirst({
                where: { id, patientId: patientid },
            });
            if (!EducationBackground) {
                res.status(404).json({ error: "EducationBackground not found" });
                return;
            }
            res.status(200).json({ EducationBackground });
        }
        catch (error) {
            console.error("Get EducationBackground error:", error);
            res.status(500).json({ error: "Failed to fetch EducationBackground" });
        }
    }
    async updateEducationBackground(req, res) {
        try {
            const { id } = req.params;
            const rest = __rest(req.body, []);
            const EducationBackground = await database_1.default.educationBackground.update({
                where: { id },
                data: Object.assign({}, rest),
            });
            res.status(200).json({
                message: "Education Background updated successfully",
                EducationBackground,
            });
        }
        catch (error) {
            console.error("Update EducationBackground error:", error);
            res.status(500).json({ error: "Failed to update EducationBackground" });
        }
    }
    async deleteEducationBackground(req, res) {
        try {
            const { id, patientid } = req.params;
            const EducationBackground = await database_1.default.educationBackground.findFirst({
                where: { id, patientId: patientid },
            });
            if (!EducationBackground) {
                res.status(404).json({ error: "EducationBackground not found" });
                return;
            }
            await database_1.default.educationBackground.delete({
                where: { id },
            });
            res.status(200).json({
                message: "Education Background deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete EducationBackground error:", error);
            res.status(500).json({ error: "Failed to delete EducationBackground" });
        }
    }
}
exports.EducationBackgroundController = EducationBackgroundController;
//# sourceMappingURL=educationBackground.controller.js.map