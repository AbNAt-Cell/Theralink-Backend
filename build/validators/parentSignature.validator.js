"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parentSignatureSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.parentSignatureSchema = joi_1.default.object({
    signature: joi_1.default.string().required(),
    pin: joi_1.default.string().required(),
});
//# sourceMappingURL=parentSignature.validator.js.map