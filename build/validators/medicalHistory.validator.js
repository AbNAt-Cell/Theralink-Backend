"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicalHistorySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const client_1 = require("@prisma/client");
exports.medicalHistorySchema = joi_1.default.object({
    history: joi_1.default.string().required(),
    addictionDetails: joi_1.default.string().required(),
    date: joi_1.default.date().required(),
    allergies: joi_1.default.boolean().required(),
    sexualAbuse: joi_1.default.boolean().required(),
    pregnantBefore: joi_1.default.boolean().required(),
    expectingPregnancy: joi_1.default.boolean().required(),
    abortion: joi_1.default.boolean().required(),
    breastCancer: joi_1.default.boolean().required(),
    substances: joi_1.default.string()
        .valid(...Object.values(client_1.SubstanceAddictionType))
        .required(),
    behaviours: joi_1.default.string()
        .valid(...Object.values(client_1.BehaviouralAddictionType))
        .required(),
});
//# sourceMappingURL=medicalHistory.validator.js.map