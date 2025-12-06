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
exports.ParentSignatureController = void 0;
const database_1 = __importDefault(require("../config/database"));
class ParentSignatureController {
    async createParentSignature(req, res) {
        try {
            const { patientid } = req.params;
            const rest = __rest(req.body, []);
            const newParentSignature = await database_1.default.parentSignature.create({
                data: Object.assign(Object.assign({}, rest), { patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "Client signature created successfully",
                ParentSignature: newParentSignature,
            });
        }
        catch (error) {
            console.error("Create ParentSignature error:", error);
            res.status(500).json({ error: "Failed to create ParentSignature" });
        }
    }
    async getParentSignatures(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const ParentSignature = await database_1.default.parentSignature.findMany({
                orderBy: { createdAt: "desc" },
                where: { patientId: patientid },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.parentSignature.count({
                where: { patientId: patientid },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                ParentSignature,
            });
        }
        catch (error) {
            console.error("Get ParentSignatures error:", error);
            res.status(500).json({ error: "Failed to fetch ParentSignatures" });
        }
    }
    async getParentSignatureById(req, res) {
        try {
            const { id, patientid } = req.params;
            const ParentSignature = await database_1.default.parentSignature.findFirst({
                where: { id, patientId: patientid },
            });
            if (!ParentSignature) {
                res.status(404).json({ error: "ParentSignature not found" });
                return;
            }
            res.status(200).json({ ParentSignature });
        }
        catch (error) {
            console.error("Get ParentSignature error:", error);
            res.status(500).json({ error: "Failed to fetch ParentSignature" });
        }
    }
    async updateParentSignature(req, res) {
        try {
            const { id } = req.params;
            const rest = __rest(req.body, []);
            const ParentSignature = await database_1.default.parentSignature.update({
                where: { id },
                data: Object.assign({}, rest),
            });
            res.status(200).json({
                message: "Client signature updated successfully",
                ParentSignature,
            });
        }
        catch (error) {
            console.error("Update ParentSignature error:", error);
            res.status(500).json({ error: "Failed to update ParentSignature" });
        }
    }
    async deleteParentSignature(req, res) {
        try {
            const { id, patientid } = req.params;
            const ParentSignature = await database_1.default.parentSignature.findFirst({
                where: { id, patientId: patientid },
            });
            if (!ParentSignature) {
                res.status(404).json({ error: "ParentSignature not found" });
                return;
            }
            await database_1.default.parentSignature.delete({
                where: { id },
            });
            res.status(200).json({
                message: "Client signature deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete ParentSignature error:", error);
            res.status(500).json({ error: "Failed to delete ParentSignature" });
        }
    }
}
exports.ParentSignatureController = ParentSignatureController;
//# sourceMappingURL=parentSignature.controller.js.map