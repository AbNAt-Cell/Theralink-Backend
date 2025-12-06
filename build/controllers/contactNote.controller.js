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
exports.ContactNoteController = void 0;
const database_1 = __importDefault(require("../config/database"));
class ContactNoteController {
    async createContactNote(req, res) {
        try {
            const { patientid } = req.params;
            const _a = req.body, { contactDate, contactTime } = _a, rest = __rest(_a, ["contactDate", "contactTime"]);
            const newContactNote = await database_1.default.contactNote.create({
                data: Object.assign(Object.assign({}, rest), { contactTime: new Date(contactTime), contactDate: new Date(contactDate), patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "ContactNote created successfully",
                ContactNote: newContactNote,
            });
        }
        catch (error) {
            console.error("Create ContactNote error:", error);
            res.status(500).json({ error: "Failed to create ContactNote" });
        }
    }
    async getContactNotes(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const ContactNote = await database_1.default.contactNote.findMany({
                orderBy: { createdAt: "desc" },
                where: { patientId: patientid },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.contactNote.count({
                where: { patientId: patientid },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                ContactNote,
            });
        }
        catch (error) {
            console.error("Get ContactNotes error:", error);
            res.status(500).json({ error: "Failed to fetch ContactNotes" });
        }
    }
    async getContactNoteById(req, res) {
        try {
            const { id, patientid } = req.params;
            const ContactNote = await database_1.default.contactNote.findFirst({
                where: { id, patientId: patientid },
            });
            if (!ContactNote) {
                res.status(404).json({ error: "ContactNote not found" });
                return;
            }
            res.status(200).json({ ContactNote });
        }
        catch (error) {
            console.error("Get ContactNote error:", error);
            res.status(500).json({ error: "Failed to fetch ContactNote" });
        }
    }
    async updateContactNote(req, res) {
        try {
            const { id } = req.params;
            const _a = req.body, { contactTime, contactDate } = _a, rest = __rest(_a, ["contactTime", "contactDate"]);
            const ContactNote = await database_1.default.contactNote.update({
                where: { id },
                data: Object.assign(Object.assign({}, rest), { contactTime: new Date(contactTime), contactDate: new Date(contactDate) }),
            });
            res.status(200).json({
                message: "ContactNote updated successfully",
                ContactNote,
            });
        }
        catch (error) {
            console.error("Update ContactNote error:", error);
            res.status(500).json({ error: "Failed to update ContactNote" });
        }
    }
    async deleteContactNote(req, res) {
        try {
            const { id, patientid } = req.params;
            const ContactNote = await database_1.default.contactNote.findFirst({
                where: { id, patientId: patientid },
            });
            if (!ContactNote) {
                res.status(404).json({ error: "ContactNote not found" });
                return;
            }
            await database_1.default.contactNote.delete({
                where: { id },
            });
            res.status(200).json({
                message: "ContactNote deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete ContactNote error:", error);
            res.status(500).json({ error: "Failed to delete ContactNote" });
        }
    }
}
exports.ContactNoteController = ContactNoteController;
//# sourceMappingURL=contactNote.controller.js.map