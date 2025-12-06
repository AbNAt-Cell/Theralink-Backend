"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicationAdminstrationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.medicationAdminstrationSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    route: joi_1.default.string().required(),
    notes: joi_1.default.string().required(),
    initials: joi_1.default.string().required(),
    frequency: joi_1.default.number().required(),
    administeredDate: joi_1.default.date().required(),
});
//# sourceMappingURL=medicationAdminstration.validator.js.map