"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientFileSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.patientFileSchema = joi_1.default.object({
    filePath: joi_1.default.string().required(),
    fileType: joi_1.default.string().required(),
    fileUrl: joi_1.default.string().required(),
    description: joi_1.default.date().optional(),
});
//# sourceMappingURL=patientFile.validator.js.map