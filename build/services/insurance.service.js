"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsuranceService = void 0;
const database_1 = __importDefault(require("../config/database"));
class InsuranceService {
    async createInsuranceService(startDate, endDate, patientid, policyNumber, insuranceType, tx) {
        const prismaClient = tx || database_1.default;
        const newInsurance = await prismaClient.insurance.create({
            data: {
                policyNumber,
                insuranceType,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null,
                patient: {
                    connect: { id: patientid },
                },
            },
        });
        return newInsurance;
    }
}
exports.InsuranceService = InsuranceService;
//# sourceMappingURL=insurance.service.js.map