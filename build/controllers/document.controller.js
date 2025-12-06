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
exports.DocumentController = void 0;
const database_1 = __importDefault(require("../config/database"));
class DocumentController {
    async createDocument(req, res) {
        try {
            const { patientid } = req.params;
            const rest = __rest(req.body, []);
            const newDocument = await database_1.default.document.create({
                data: Object.assign(Object.assign({}, rest), { patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "Document created successfully",
                document: newDocument,
            });
        }
        catch (error) {
            console.error("Create Document error:", error);
            res.status(500).json({ error: "Failed to create Document" });
        }
    }
    async getDocuments(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const document = await database_1.default.document.findMany({
                orderBy: { createdAt: "desc" },
                where: { patientId: patientid },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.document.count({
                where: { patientId: patientid },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                document,
            });
        }
        catch (error) {
            console.error("Get Documents error:", error);
            res.status(500).json({ error: "Failed to fetch Documents" });
        }
    }
    async getDocumentById(req, res) {
        try {
            const { id, patientid } = req.params;
            const Document = await database_1.default.document.findFirst({
                where: { id, patientId: patientid },
            });
            if (!Document) {
                res.status(404).json({ error: "Document not found" });
                return;
            }
            res.status(200).json({ Document });
        }
        catch (error) {
            console.error("Get Document error:", error);
            res.status(500).json({ error: "Failed to fetch Document" });
        }
    }
    async updateDocument(req, res) {
        try {
            const { id } = req.params;
            const rest = __rest(req.body, []);
            const Document = await database_1.default.document.update({
                where: { id },
                data: Object.assign({}, rest),
            });
            res.status(200).json({
                message: "Document updated successfully",
                Document,
            });
        }
        catch (error) {
            console.error("Update Document error:", error);
            res.status(500).json({ error: "Failed to update Document" });
        }
    }
    async deleteDocument(req, res) {
        try {
            const { id, patientid } = req.params;
            const document = await database_1.default.document.findFirst({
                where: { id, patientId: patientid },
            });
            if (!document) {
                res.status(404).json({ error: "Document not found" });
                return;
            }
            await database_1.default.document.delete({
                where: { id },
            });
            res.status(200).json({
                message: "Document deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete Document error:", error);
            res.status(500).json({ error: "Failed to delete Document" });
        }
    }
}
exports.DocumentController = DocumentController;
//# sourceMappingURL=document.controller.js.map