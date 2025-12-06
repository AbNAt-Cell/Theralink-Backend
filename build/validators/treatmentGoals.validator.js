"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.treatmentGoalsSchema = void 0;
const client_1 = require("@prisma/client");
const joi_1 = __importDefault(require("joi"));
exports.treatmentGoalsSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    comments: joi_1.default.string().optional(),
    description: joi_1.default.string().optional(),
    startDate: joi_1.default.date().optional(),
    endDate: joi_1.default.date().optional(),
    targetDate: joi_1.default.date().required(),
    status: joi_1.default.string().valid(...Object.values(client_1.treatmentGoalsStatus)).required(),
});
//# sourceMappingURL=treatmentGoals.validator.js.map