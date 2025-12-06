"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateuserSchema = void 0;
const client_1 = require("@prisma/client");
const joi_1 = __importDefault(require("joi"));
exports.updateuserSchema = joi_1.default.object({
    email: joi_1.default.string().email().optional(),
    username: joi_1.default.string().optional(),
    firstName: joi_1.default.string().optional(),
    lastName: joi_1.default.string().optional(),
    limit: joi_1.default.number().optional(),
    page: joi_1.default.number().optional(),
    role: joi_1.default.string()
        .valid(...Object.values(client_1.Role))
        .optional(),
});
//# sourceMappingURL=user.validator.js.map