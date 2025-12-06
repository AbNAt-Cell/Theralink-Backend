"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.treatmentInterventionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.treatmentInterventionSchema = joi_1.default.object({
    intervention: joi_1.default.string().required(),
    servicetype: joi_1.default.string().optional(),
    stafftypes: joi_1.default.string().optional(),
    customstafftypes: joi_1.default.string().optional(),
    frequency: joi_1.default.number().required(),
    location: joi_1.default.string().required(),
    duration: joi_1.default.number().required(),
});
//# sourceMappingURL=treatmentIntervention.validator.js.map