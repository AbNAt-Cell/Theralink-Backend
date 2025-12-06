"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dischargeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const client_1 = require("@prisma/client");
exports.dischargeSchema = joi_1.default.object({
    summary: joi_1.default.string().required(),
    linkDocument: joi_1.default.string().required(),
    dischargeDate: joi_1.default.date().required(),
    reason: joi_1.default.string()
        .valid(...Object.values(client_1.dischargeReasonType))
        .required(),
});
//# sourceMappingURL=discharge.validator.js.map