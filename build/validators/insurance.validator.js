"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insuranceSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const client_1 = require("@prisma/client");
exports.insuranceSchema = joi_1.default.object({
    policyNumber: joi_1.default.string().required(),
    insuranceType: joi_1.default.string().required(),
    startDate: joi_1.default.date().required(),
    endDate: joi_1.default.date().optional(),
    status: joi_1.default.string().valid(...Object.values(client_1.insuranceStatus)).required(),
    eligibilityStatus: joi_1.default.string().valid(...Object.values(client_1.eligibilityStatus)).required(),
});
//# sourceMappingURL=insurance.validator.js.map