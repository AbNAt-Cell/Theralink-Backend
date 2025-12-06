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
exports.PatientController = void 0;
const database_1 = __importDefault(require("../config/database"));
const insurance_service_1 = require("../services/insurance.service");
const auth_service_1 = require("../services/auth.service");
class PatientController {
    async createPatient(req, res) {
        try {
            const _a = req.body, { email, dateOfBirth, insurance, gender, phone, startDate, address, race } = _a, rest = __rest(_a, ["email", "dateOfBirth", "insurance", "gender", "phone", "startDate", "address", "race"]);
            const [updatedPatient, _newInsurance, _newUser] = await database_1.default.$transaction(async (tx) => {
                const newPatient = await tx.patient.create({
                    data: Object.assign(Object.assign({}, rest), { gender,
                        race,
                        email, phone: phone || undefined, dateOfBirth: new Date(dateOfBirth), startDate: new Date(startDate), address: address
                            ? {
                                street: address.street,
                                city: address.city,
                                state: address.state,
                                zipCode: address.zipCode,
                            }
                            : undefined }),
                });
                const insuranceService = new insurance_service_1.InsuranceService();
                let newInsurance = null;
                if (insurance) {
                    newInsurance = await insuranceService.createInsuranceService(insurance.startDate, insurance.endDate, newPatient.id, insurance.policyNumber, insurance.insuranceType, tx);
                }
                const newUser = await (0, auth_service_1.signupService)(email, "CLIENT", tx, false, newPatient === null || newPatient === void 0 ? void 0 : newPatient.firstName, newPatient === null || newPatient === void 0 ? void 0 : newPatient.lastName);
                const updatedPatient = await tx.patient.update({
                    where: { id: newPatient.id },
                    data: { userId: newUser.user.id },
                });
                return [updatedPatient, newInsurance, newUser];
            }, { maxWait: 10000, timeout: 15000 });
            return res.status(201).json({
                message: "Patient created successfully",
                patient: updatedPatient,
            });
        }
        catch (error) {
            console.error("Create patient error:", error);
            return res.status(500).json({ error: "Failed to create patient" });
        }
    }
    async getPatients(_req, res) {
        try {
            const patients = await database_1.default.patient.findMany({
                orderBy: { createdAt: "desc" },
            });
            return res.status(200).json({ patients });
        }
        catch (error) {
            console.error("Get patients error:", error);
            return res.status(500).json({ error: "Failed to fetch patients" });
        }
    }
    async getPatientById(req, res) {
        try {
            const { id } = req.params;
            const patient = await database_1.default.patient.findUnique({
                where: { id },
            });
            if (!patient) {
                return res.status(404).json({ error: "Patient not found" });
            }
            return res.status(200).json({ patient });
        }
        catch (error) {
            console.error("Get patient error:", error);
            return res.status(500).json({ error: "Failed to fetch patient" });
        }
    }
    async updatePatient(req, res) {
        try {
            const { id } = req.params;
            const _a = req.body, { dateOfBirth } = _a, rest = __rest(_a, ["dateOfBirth"]);
            const patient = await database_1.default.patient.update({
                where: { id },
                data: Object.assign(Object.assign({}, rest), { dateOfBirth: new Date(dateOfBirth) }),
            });
            return res.status(200).json({
                message: "Patient updated successfully",
                patient,
            });
        }
        catch (error) {
            console.error("Update patient error:", error);
            return res.status(500).json({ error: "Failed to update patient" });
        }
    }
    async deletePatient(req, res) {
        try {
            const { id } = req.params;
            await database_1.default.patient.delete({
                where: { id },
            });
            return res.status(200).json({
                message: "Patient deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete patient error:", error);
            return res.status(500).json({ error: "Failed to delete patient" });
        }
    }
}
exports.PatientController = PatientController;
//# sourceMappingURL=patient.controller.js.map