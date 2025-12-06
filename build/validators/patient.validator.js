"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const client_1 = require("@prisma/client");
exports.patientSchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    prefix: joi_1.default.string().optional(),
    ssn: joi_1.default.string().optional(),
    comments: joi_1.default.string().optional(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().required(),
    gender: joi_1.default.string().valid(...Object.values(client_1.Gender)).required(),
    middleName: joi_1.default.string().optional(),
    nickName: joi_1.default.string().optional(),
    suffix: joi_1.default.string().optional(),
    race: joi_1.default.string().valid(...Object.values(client_1.Race)).optional(),
    dateOfBirth: joi_1.default.date().required(),
    startDate: joi_1.default.date().optional(),
    address: joi_1.default.object().optional(),
    insurance: joi_1.default.object().optional(),
});
//# sourceMappingURL=patient.validator.js.map