"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.medicationSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    route: joi_1.default.string().required(),
    purpose: joi_1.default.string().required(),
    prescriber: joi_1.default.string().required(),
    frequency: joi_1.default.number().required(),
    startDate: joi_1.default.date().required(),
    endDate: joi_1.default.date().required(),
});
//# sourceMappingURL=medication.validator.js.map