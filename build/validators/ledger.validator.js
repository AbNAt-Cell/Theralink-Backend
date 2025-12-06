"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ledgerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const client_1 = require("@prisma/client");
exports.ledgerSchema = joi_1.default.object({
    description: joi_1.default.string().required(),
    amount: joi_1.default.number().required(),
    ledgerDate: joi_1.default.date().required(),
    ledgerType: joi_1.default.string().valid(...Object.values(client_1.LedgerType)).required(),
    paymentType: joi_1.default.string().valid(...Object.values(client_1.paymentTypeStatus)).required(),
});
//# sourceMappingURL=ledger.validator.js.map