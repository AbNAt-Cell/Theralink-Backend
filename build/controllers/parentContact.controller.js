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
exports.ParentContactController = void 0;
const database_1 = __importDefault(require("../config/database"));
class ParentContactController {
    async createParentContact(req, res) {
        try {
            const { patientid } = req.params;
            const rest = __rest(req.body, []);
            const newParentContact = await database_1.default.parentContact.create({
                data: Object.assign(Object.assign({}, rest), { patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "ParentContact created successfully",
                ParentContact: newParentContact,
            });
        }
        catch (error) {
            console.error("Create ParentContact error:", error);
            res.status(500).json({ error: "Failed to create ParentContact" });
        }
    }
    async getParentContacts(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const ParentContact = await database_1.default.parentContact.findMany({
                orderBy: { createdAt: "desc" },
                where: { patientId: patientid },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.parentContact.count({
                where: { patientId: patientid },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                ParentContact,
            });
        }
        catch (error) {
            console.error("Get ParentContacts error:", error);
            res.status(500).json({ error: "Failed to fetch ParentContacts" });
        }
    }
    async getParentContactById(req, res) {
        try {
            const { id, patientid } = req.params;
            const ParentContact = await database_1.default.parentContact.findFirst({
                where: { id, patientId: patientid },
            });
            if (!ParentContact) {
                res.status(404).json({ error: "ParentContact not found" });
                return;
            }
            res.status(200).json({ ParentContact });
        }
        catch (error) {
            console.error("Get ParentContact error:", error);
            res.status(500).json({ error: "Failed to fetch ParentContact" });
        }
    }
    async updateParentContact(req, res) {
        try {
            const { id } = req.params;
            const rest = __rest(req.body, []);
            const ParentContact = await database_1.default.parentContact.update({
                where: { id },
                data: Object.assign({}, rest),
            });
            res.status(200).json({
                message: "ParentContact updated successfully",
                ParentContact,
            });
        }
        catch (error) {
            console.error("Update ParentContact error:", error);
            res.status(500).json({ error: "Failed to update ParentContact" });
        }
    }
    async deleteParentContact(req, res) {
        try {
            const { id, patientid } = req.params;
            const ParentContact = await database_1.default.parentContact.findFirst({
                where: { id, patientId: patientid },
            });
            if (!ParentContact) {
                res.status(404).json({ error: "ParentContact not found" });
                return;
            }
            await database_1.default.parentContact.delete({
                where: { id },
            });
            res.status(200).json({
                message: "ParentContact deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete ParentContact error:", error);
            res.status(500).json({ error: "Failed to delete ParentContact" });
        }
    }
}
exports.ParentContactController = ParentContactController;
//# sourceMappingURL=parentContact.controller.js.map