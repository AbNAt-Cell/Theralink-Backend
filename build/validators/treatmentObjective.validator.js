"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.treatmentObjectiveSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.treatmentObjectiveSchema = joi_1.default.object({
    objective: joi_1.default.string().required(),
    startDate: joi_1.default.date().optional(),
    endDate: joi_1.default.date().optional(),
    targetDate: joi_1.default.date().required(),
});
//# sourceMappingURL=treatmentObjective.validator.js.map