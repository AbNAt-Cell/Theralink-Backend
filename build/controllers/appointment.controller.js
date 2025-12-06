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
exports.AppointmentController = void 0;
const database_1 = __importDefault(require("../config/database"));
class AppointmentController {
    async createAppointment(req, res) {
        try {
            const _a = req.body, { date, status, patientid } = _a, rest = __rest(_a, ["date", "status", "patientid"]);
            const user = req.user;
            const conflictingAppointment = await database_1.default.appointment.findFirst({
                where: {
                    healthcareProviderId: user === null || user === void 0 ? void 0 : user.id,
                    date: new Date(date),
                },
            });
            if (conflictingAppointment) {
                return res.status(400).json({
                    error: "The healthcare provider is already booked at this time. Please choose another time.",
                });
            }
            const newAppointment = await database_1.default.appointment.create({
                data: Object.assign(Object.assign({}, rest), { date: new Date(date), status, patient: {
                        connect: { id: patientid },
                    }, healthcareProvider: {
                        connect: { id: user === null || user === void 0 ? void 0 : user.id },
                    } }),
            });
            return res.status(201).json({
                message: "Appointment created successfully",
                appointment: newAppointment,
            });
        }
        catch (error) {
            console.error("Create Appointment error:", error);
            return res.status(500).json({ error: "Failed to create Appointment" });
        }
    }
    async getAppointments(req, res) {
        const user = req.user;
        const { page = "1", limit = "10" } = req.query;
        const parsedPage = Math.max(1, parseInt(page, 10));
        const parsedLimit = Math.max(1, parseInt(limit, 10));
        try {
            const Appointments = await database_1.default.appointment.findMany({
                orderBy: { createdAt: "desc" },
                where: {
                    healthcareProviderId: user === null || user === void 0 ? void 0 : user.id,
                },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.appointment.count({
                where: { healthcareProviderId: user === null || user === void 0 ? void 0 : user.id },
            });
            return res
                .status(200)
                .json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                Appointments,
            });
        }
        catch (error) {
            console.error("Get Appointments error:", error);
            return res.status(500).json({ error: "Failed to fetch Appointments" });
        }
    }
    async getAppointmentById(req, res) {
        try {
            const { id } = req.params;
            const Appointment = await database_1.default.appointment.findUnique({
                where: { id },
            });
            if (!Appointment) {
                return res.status(404).json({ error: "Appointment not found" });
            }
            return res.status(200).json({ Appointment });
        }
        catch (error) {
            console.error("Get Appointment error:", error);
            return res.status(500).json({ error: "Failed to fetch Appointment" });
        }
    }
    async updateAppointment(req, res) {
        try {
            const { id } = req.params;
            const _a = req.body, { dateOfBirth } = _a, rest = __rest(_a, ["dateOfBirth"]);
            const user = req.user;
            const Appointment = await database_1.default.appointment.update({
                where: { id, healthcareProviderId: user === null || user === void 0 ? void 0 : user.id },
                data: Object.assign(Object.assign({}, rest), { dateOfBirth: new Date(dateOfBirth) }),
            });
            return res.status(200).json({
                message: "Appointment updated successfully",
                Appointment,
            });
        }
        catch (error) {
            console.error("Updateppointment error:", error);
            return res.status(500).json({ error: "Failed to Updateppointment" });
        }
    }
    async deleteAppointment(req, res) {
        try {
            const { id } = req.params;
            await database_1.default.appointment.delete({
                where: { id },
            });
            return res.status(200).json({
                message: "Appointment deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete Appointment error:", error);
            return res.status(500).json({ error: "Failed to delete Appointment" });
        }
    }
}
exports.AppointmentController = AppointmentController;
//# sourceMappingURL=appointment.controller.js.map