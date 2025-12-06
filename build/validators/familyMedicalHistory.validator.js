"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.familyMedicalHistorySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.familyMedicalHistorySchema = joi_1.default.object({
    familyhistory: joi_1.default.string().required(),
});
//# sourceMappingURL=familyMedicalHistory.validator.js.map