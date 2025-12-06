"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.documentSchema = joi_1.default.object({
    template: joi_1.default.string().required(),
    author: joi_1.default.string().required(),
    client: joi_1.default.string().required(),
    date: joi_1.default.date().required(),
});
//# sourceMappingURL=document.validator.js.map