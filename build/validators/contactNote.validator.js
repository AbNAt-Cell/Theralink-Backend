"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactNoteSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const client_1 = require("@prisma/client");
exports.contactNoteSchema = joi_1.default.object({
    staff: joi_1.default.string().required(),
    note: joi_1.default.string().required(),
    contactDate: joi_1.default.date().required(),
    contactTime: joi_1.default.date().required(),
    contactMethod: joi_1.default.string()
        .valid(...Object.values(client_1.contactMethodStatus))
        .required(),
    contacted: joi_1.default.string()
        .valid(...Object.values(client_1.contactedStatus))
        .required(),
});
//# sourceMappingURL=contactNote.validator.js.map