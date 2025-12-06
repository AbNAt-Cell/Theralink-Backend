"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.treatmentPlanSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.treatmentPlanSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    startTime: joi_1.default.string().required(),
    stepdownServices: joi_1.default.string().optional(),
    dischargePlanning: joi_1.default.string().optional(),
    agencies: joi_1.default.string().optional(),
    endTime: joi_1.default.string().optional(),
    service: joi_1.default.string().required(),
    placeOfService: joi_1.default.string().required(),
    maintenanceRecommendation: joi_1.default.string().optional(),
    strength: joi_1.default.string().optional(),
    needs: joi_1.default.string().optional(),
    abilites: joi_1.default.string().optional(),
    preferences: joi_1.default.string().optional(),
    planning: joi_1.default.string().optional(),
    startDate: joi_1.default.date().optional(),
    endDate: joi_1.default.date().optional(),
});
//# sourceMappingURL=treatmentPlan.validator.js.map