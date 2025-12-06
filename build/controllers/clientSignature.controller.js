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
exports.ClientSignatureController = void 0;
const database_1 = __importDefault(require("../config/database"));
class ClientSignatureController {
    async createClientSignature(req, res) {
        try {
            const { patientid } = req.params;
            const rest = __rest(req.body, []);
            const newClientSignature = await database_1.default.clientSignature.create({
                data: Object.assign(Object.assign({}, rest), { patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "Client signature created successfully",
                ClientSignature: newClientSignature,
            });
        }
        catch (error) {
            console.error("Create ClientSignature error:", error);
            res.status(500).json({ error: "Failed to create ClientSignature" });
        }
    }
    async getClientSignatures(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const ClientSignature = await database_1.default.clientSignature.findMany({
                orderBy: { createdAt: "desc" },
                where: { patientId: patientid },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.clientSignature.count({
                where: { patientId: patientid },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                ClientSignature,
            });
        }
        catch (error) {
            console.error("Get ClientSignatures error:", error);
            res.status(500).json({ error: "Failed to fetch ClientSignatures" });
        }
    }
    async getClientSignatureById(req, res) {
        try {
            const { id, patientid } = req.params;
            const ClientSignature = await database_1.default.clientSignature.findFirst({
                where: { id, patientId: patientid },
            });
            if (!ClientSignature) {
                res.status(404).json({ error: "ClientSignature not found" });
                return;
            }
            res.status(200).json({ ClientSignature });
        }
        catch (error) {
            console.error("Get ClientSignature error:", error);
            res.status(500).json({ error: "Failed to fetch ClientSignature" });
        }
    }
    async updateClientSignature(req, res) {
        try {
            const { id } = req.params;
            const rest = __rest(req.body, []);
            const ClientSignature = await database_1.default.clientSignature.update({
                where: { id },
                data: Object.assign({}, rest),
            });
            res.status(200).json({
                message: "Client signature updated successfully",
                ClientSignature,
            });
        }
        catch (error) {
            console.error("Update ClientSignature error:", error);
            res.status(500).json({ error: "Failed to update ClientSignature" });
        }
    }
    async deleteClientSignature(req, res) {
        try {
            const { id, patientid } = req.params;
            const ClientSignature = await database_1.default.clientSignature.findFirst({
                where: { id, patientId: patientid },
            });
            if (!ClientSignature) {
                res.status(404).json({ error: "ClientSignature not found" });
                return;
            }
            await database_1.default.clientSignature.delete({
                where: { id },
            });
            res.status(200).json({
                message: "Client signature deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete ClientSignature error:", error);
            res.status(500).json({ error: "Failed to delete ClientSignature" });
        }
    }
}
exports.ClientSignatureController = ClientSignatureController;
//# sourceMappingURL=clientSignature.controller.js.map