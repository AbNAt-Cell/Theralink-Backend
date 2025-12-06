"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.immunizationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.immunizationSchema = joi_1.default.object({
    vaccineName: joi_1.default.string().required(),
    manufacturer: joi_1.default.string().required(),
    temperature: joi_1.default.number().required(),
    lotNumber: joi_1.default.string().required(),
    adminstrationSite: joi_1.default.string().required(),
    administeredBy: joi_1.default.string().required(),
    comments: joi_1.default.string().required(),
    rejectedReason: joi_1.default.string().required(),
    immunization: joi_1.default.string().optional(),
    dose: joi_1.default.number().required(),
    isRejected: joi_1.default.boolean().required(),
    dateAdministered: joi_1.default.date().required(),
    dateExpired: joi_1.default.date().required(),
});
//# sourceMappingURL=immunization.validator.js.map