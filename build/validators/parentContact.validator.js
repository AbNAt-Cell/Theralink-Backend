"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parentContactSchema = void 0;
const client_1 = require("@prisma/client");
const joi_1 = __importDefault(require("joi"));
exports.parentContactSchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    state: joi_1.default.string().required(),
    comment: joi_1.default.string().optional(),
    relationship: joi_1.default.string()
        .valid(...Object.values(client_1.contactedStatus))
        .required(),
});
//# sourceMappingURL=parentContact.validator.js.map