"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.educationBackgroundSchema = void 0;
const client_1 = require("@prisma/client");
const joi_1 = __importDefault(require("joi"));
exports.educationBackgroundSchema = joi_1.default.object({
    degree: joi_1.default.string().required(),
    grade: joi_1.default.string().required(),
    yearOfPassing: joi_1.default.string().required(),
    educationLevel: joi_1.default.string()
        .valid(...Object.values(client_1.educationLevelStatus))
        .required(),
});
//# sourceMappingURL=educationBackground.validator.js.map