"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.intakeformSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.intakeformSchema = joi_1.default.object({
    emergencyContactName: joi_1.default.string().required(),
    emergencyContactPhone: joi_1.default.string().required(),
    medicalHistory: joi_1.default.object().optional(),
    currentMedications: joi_1.default.object().optional(),
    allergies: joi_1.default.object().optional(),
});
//# sourceMappingURL=intakeform.validator.js.map