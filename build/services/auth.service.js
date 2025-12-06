"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupService = void 0;
const auth_utils_1 = require("../utils/auth.utils");
const database_1 = __importDefault(require("../config/database"));
const email_service_1 = require("./email.service");
const signupService = async (email, role, tx, sendEmail = true, firstName, lastName) => {
    const prismaClient = tx || database_1.default;
    const username = (0, auth_utils_1.generateUsername)(email);
    const password = (0, auth_utils_1.generatePassword)();
    const hashedPassword = await (0, auth_utils_1.hashPassword)(password);
    const roleEnum = role;
    lastName = lastName ? lastName : null;
    firstName = firstName ? firstName : null;
    const user = await prismaClient.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
            role: roleEnum,
            firstName,
            lastName,
        },
    });
    const token = (0, auth_utils_1.generateToken)(user);
    if (sendEmail && !tx) {
        const emailService = new email_service_1.EmailService();
        await emailService.sendCredentials(email, username, password);
        console.log("Email sent successfully");
    }
    return { user, token, username, password };
};
exports.signupService = signupService;
//# sourceMappingURL=auth.service.js.map