"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const client_1 = require("@prisma/client");
exports.appointmentSchema = joi_1.default.object({
    status: joi_1.default.string()
        .valid(...Object.values(client_1.AppointmentStatus))
        .required(),
    date: joi_1.default.date().required(),
});
//# sourceMappingURL=appointment.validator.js.map