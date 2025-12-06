"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginSchema = exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    role: joi_1.default.string().valid('ADMIN', 'CLIENT', "STAFF").required()
});
exports.loginSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
exports.forgotPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().email().required()
});
exports.resetPasswordSchema = joi_1.default.object({
    token: joi_1.default.string().required(),
    password: joi_1.default.string().min(8).required()
});
//# sourceMappingURL=auth.validator.js.map