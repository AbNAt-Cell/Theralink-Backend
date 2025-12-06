"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socialDeterminantSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.socialDeterminantSchema = joi_1.default.object({
    finance: joi_1.default.string().required(),
    food: joi_1.default.string().optional(),
    transportation: joi_1.default.string().optional(),
    activity: joi_1.default.string().required(),
});
//# sourceMappingURL=socialDeterminant.validator.js.map