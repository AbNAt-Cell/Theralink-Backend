"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employmentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.employmentSchema = joi_1.default.object({
    organizationName: joi_1.default.string().required(),
    designation: joi_1.default.string().required(),
    startDate: joi_1.default.date().required(),
    endDate: joi_1.default.date().required(),
    responsibilities: joi_1.default.string().required(),
});
//# sourceMappingURL=employment.validator.js.map