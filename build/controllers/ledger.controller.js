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
exports.LedgerController = void 0;
const database_1 = __importDefault(require("../config/database"));
class LedgerController {
    async createLedger(req, res) {
        try {
            const { patientid } = req.params;
            const _a = req.body, { ledgerDate } = _a, rest = __rest(_a, ["ledgerDate"]);
            const newLedger = await database_1.default.ledger.create({
                data: Object.assign(Object.assign({}, rest), { ledgerDate: new Date(ledgerDate), patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "Ledger created successfully",
                ledger: newLedger,
            });
        }
        catch (error) {
            console.error("Create Ledger error:", error);
            res.status(500).json({ error: "Failed to create Ledger" });
        }
    }
    async getLedgers(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const Ledger = await database_1.default.ledger.findMany({
                orderBy: { createdAt: "desc" },
                where: { patientId: patientid },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.ledger.count({
                where: { patientId: patientid },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                Ledger,
            });
        }
        catch (error) {
            console.error("Get Ledgers error:", error);
            res.status(500).json({ error: "Failed to fetch Ledgers" });
        }
    }
    async getLedgerById(req, res) {
        try {
            const { id, patientid } = req.params;
            const Ledger = await database_1.default.ledger.findFirst({
                where: { id, patientId: patientid },
            });
            if (!Ledger) {
                res.status(404).json({ error: "Ledger not found" });
                return;
            }
            res.status(200).json({ Ledger });
        }
        catch (error) {
            console.error("Get Ledger error:", error);
            res.status(500).json({ error: "Failed to fetch Ledger" });
        }
    }
    async updateLedger(req, res) {
        try {
            const { id } = req.params;
            const _a = req.body, { ledgerDate } = _a, rest = __rest(_a, ["ledgerDate"]);
            const ledger = await database_1.default.ledger.update({
                where: { id },
                data: Object.assign(Object.assign({}, rest), { ledgerDate: new Date(ledgerDate) }),
            });
            res.status(200).json({
                message: "ledger updated successfully",
                ledger,
            });
        }
        catch (error) {
            console.error("Update Ledger error:", error);
            res.status(500).json({ error: "Failed to update Ledger" });
        }
    }
    async deleteLedger(req, res) {
        try {
            const { id, patientid } = req.params;
            const Ledger = await database_1.default.ledger.findFirst({
                where: { id, patientId: patientid },
            });
            if (!Ledger) {
                res.status(404).json({ error: "Ledger not found" });
                return;
            }
            await database_1.default.ledger.delete({
                where: { id },
            });
            res.status(200).json({
                message: "Ledger deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete Ledger error:", error);
            res.status(500).json({ error: "Failed to delete Ledger" });
        }
    }
}
exports.LedgerController = LedgerController;
//# sourceMappingURL=ledger.controller.js.map