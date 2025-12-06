"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnosisSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.diagnosisSchema = joi_1.default.object({
    description: joi_1.default.string().required(),
    diagnosisCode: joi_1.default.string().required(),
    diagnosisDate: joi_1.default.date().required(),
});
//# sourceMappingURL=diagnosis.validator.js.map