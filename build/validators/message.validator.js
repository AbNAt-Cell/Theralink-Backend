"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSchema = void 0;
const client_1 = require("@prisma/client");
const joi_1 = __importDefault(require("joi"));
exports.messageSchema = joi_1.default.object({
    body: joi_1.default.string().min(6).max(250).required(),
    subject: joi_1.default.string().required(),
    isRead: joi_1.default.boolean().required(),
    isImportant: joi_1.default.boolean().required(),
    isSpam: joi_1.default.boolean().required(),
    isDeleted: joi_1.default.boolean().required(),
    image: joi_1.default.string().optional(),
    toUserId: joi_1.default.string().required(),
    status: joi_1.default.string()
        .valid(...Object.values(client_1.MessageSentStatus))
        .optional(),
});
//# sourceMappingURL=message.validator.js.map