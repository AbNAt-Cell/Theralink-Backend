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
exports.StaffController = void 0;
const database_1 = __importDefault(require("../config/database"));
const auth_service_1 = require("../services/auth.service");
class StaffController {
    async createStaff(req, res) {
        try {
            const _a = req.body, { email, dateOfBirth, gender, phone, positionEffectiveDate, race, ssn } = _a, rest = __rest(_a, ["email", "dateOfBirth", "gender", "phone", "positionEffectiveDate", "race", "ssn"]);
            const [newStaff, _newUser] = await database_1.default.$transaction(async (tx) => {
                const newStaff = await tx.staff.create({
                    data: Object.assign(Object.assign({}, rest), { gender,
                        race,
                        ssn,
                        email, phone: phone || undefined, dateOfBirth: new Date(dateOfBirth), positionEffectiveDate: new Date(positionEffectiveDate) }),
                });
                const newUser = await (0, auth_service_1.signupService)(email, "STAFF", tx, false, newStaff === null || newStaff === void 0 ? void 0 : newStaff.firstName, newStaff === null || newStaff === void 0 ? void 0 : newStaff.lastName);
                return [newStaff, newUser];
            }, { maxWait: 10000, timeout: 15000 });
            return res.status(201).json({
                message: "staff created successfully",
                staff: newStaff,
            });
        }
        catch (error) {
            console.error("Create staff error:", error);
            return res.status(500).json({ error: "Failed to create staff" });
        }
    }
    async getStaffs(_req, res) {
        try {
            const staffs = await database_1.default.staff.findMany({
                orderBy: { createdAt: "desc" },
            });
            return res.status(200).json({ staffs });
        }
        catch (error) {
            console.error("Get staffs error:", error);
            return res.status(500).json({ error: "Failed to fetch staffs" });
        }
    }
    async getStaffById(req, res) {
        try {
            const { id } = req.params;
            const staff = await database_1.default.staff.findUnique({
                where: { id },
            });
            if (!staff) {
                return res.status(404).json({ error: "staff not found" });
            }
            return res.status(200).json({ staff });
        }
        catch (error) {
            console.error("Get staff error:", error);
            return res.status(500).json({ error: "Failed to fetch staff" });
        }
    }
    async updateStaff(req, res) {
        try {
            const { id } = req.params;
            const _a = req.body, { dateOfBirth } = _a, rest = __rest(_a, ["dateOfBirth"]);
            const staff = await database_1.default.staff.update({
                where: { id },
                data: Object.assign(Object.assign({}, rest), { dateOfBirth: new Date(dateOfBirth) }),
            });
            return res.status(200).json({
                message: "staff updated successfully",
                staff,
            });
        }
        catch (error) {
            console.error("Update staff error:", error);
            return res.status(500).json({ error: "Failed to update staff" });
        }
    }
    async deleteStaff(req, res) {
        try {
            const { id } = req.params;
            await database_1.default.staff.delete({
                where: { id },
            });
            return res.status(200).json({
                message: "staff deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete staff error:", error);
            return res.status(500).json({ error: "Failed to delete staff" });
        }
    }
}
exports.StaffController = StaffController;
//# sourceMappingURL=staff.controller.js.map