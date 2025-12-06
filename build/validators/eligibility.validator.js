"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eligibilitySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const client_1 = require("@prisma/client");
exports.eligibilitySchema = joi_1.default.object({
    notes: joi_1.default.string().required(),
    checkedAt: joi_1.default.date().required(),
    eligibilityStatus: joi_1.default.string().valid(...Object.values(client_1.eligibilityStatus)).required(),
});
//# sourceMappingURL=eligibility.validator.js.map