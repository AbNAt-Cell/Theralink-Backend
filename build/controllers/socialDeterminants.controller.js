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
exports.SocialDeterminantsController = void 0;
const database_1 = __importDefault(require("../config/database"));
class SocialDeterminantsController {
    async createSocialDeterminants(req, res) {
        try {
            const { patientid } = req.params;
            const rest = __rest(req.body, []);
            const newSocialDeterminants = await database_1.default.socialDeterminants.create({
                data: Object.assign(Object.assign({}, rest), { patient: {
                        connect: { id: patientid },
                    } }),
            });
            res.status(201).json({
                message: "Social Determinants created successfully",
                SocialDeterminants: newSocialDeterminants,
            });
        }
        catch (error) {
            console.error("Create SocialDeterminants error:", error);
            res.status(500).json({ error: "Failed to create SocialDeterminants" });
        }
    }
    async getSocialDeterminants(req, res) {
        try {
            const { patientid } = req.params;
            const { page = "1", limit = "10" } = req.query;
            const parsedPage = Math.max(1, parseInt(page, 10));
            const parsedLimit = Math.max(1, parseInt(limit, 10));
            const SocialDeterminants = await database_1.default.socialDeterminants.findMany({
                orderBy: { createdAt: "desc" },
                where: { patientId: patientid },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.socialDeterminants.count({
                where: { patientId: patientid },
            });
            res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                SocialDeterminants,
            });
        }
        catch (error) {
            console.error("Get SocialDeterminantss error:", error);
            res.status(500).json({ error: "Failed to fetch SocialDeterminantss" });
        }
    }
    async getSocialDeterminantsById(req, res) {
        try {
            const { id, patientid } = req.params;
            const SocialDeterminants = await database_1.default.socialDeterminants.findFirst({
                where: { id, patientId: patientid },
            });
            if (!SocialDeterminants) {
                res.status(404).json({ error: "SocialDeterminants not found" });
                return;
            }
            res.status(200).json({ SocialDeterminants });
        }
        catch (error) {
            console.error("Get SocialDeterminants error:", error);
            res.status(500).json({ error: "Failed to fetch SocialDeterminants" });
        }
    }
    async updateSocialDeterminants(req, res) {
        try {
            const { id } = req.params;
            const rest = __rest(req.body, []);
            const SocialDeterminants = await database_1.default.socialDeterminants.update({
                where: { id },
                data: Object.assign({}, rest),
            });
            res.status(200).json({
                message: "Social Determinants updated successfully",
                SocialDeterminants,
            });
        }
        catch (error) {
            console.error("Update SocialDeterminants error:", error);
            res.status(500).json({ error: "Failed to update SocialDeterminants" });
        }
    }
    async deleteSocialDeterminants(req, res) {
        try {
            const { id, patientid } = req.params;
            const SocialDeterminants = await database_1.default.socialDeterminants.findFirst({
                where: { id, patientId: patientid },
            });
            if (!SocialDeterminants) {
                res.status(404).json({ error: "SocialDeterminants not found" });
                return;
            }
            await database_1.default.socialDeterminants.delete({
                where: { id },
            });
            res.status(200).json({
                message: "Social Determinants deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete SocialDeterminants error:", error);
            res.status(500).json({ error: "Failed to delete SocialDeterminants" });
        }
    }
}
exports.SocialDeterminantsController = SocialDeterminantsController;
//# sourceMappingURL=socialDeterminants.controller.js.map