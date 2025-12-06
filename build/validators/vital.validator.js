"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vitalSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.vitalSchema = joi_1.default.object({
    bpSys: joi_1.default.number().required(),
    bpDias: joi_1.default.number().required(),
    temperature: joi_1.default.number().required(),
    pulseRate: joi_1.default.number().required(),
    respiratoryRate: joi_1.default.number().required(),
    weight: joi_1.default.number().required(),
    height: joi_1.default.number().required(),
    recordDate: joi_1.default.date().required(),
});
//# sourceMappingURL=vital.validator.js.map