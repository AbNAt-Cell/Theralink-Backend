"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const database_1 = __importDefault(require("../config/database"));
const auth_utils_1 = require("../utils/auth.utils");
const email_service_1 = require("../services/email.service");
const auth_utils_2 = require("../utils/auth.utils");
const auth_service_1 = require("../services/auth.service");
class AuthController {
    constructor() {
        this.signup = async (req, res) => {
            try {
                const { email, role } = req.body;
                const existingUser = await database_1.default.user.findUnique({ where: { email } });
                if (existingUser) {
                    return res.status(400).json({ error: "Email already registered" });
                }
                const { user, token, username, password } = await (0, auth_service_1.signupService)(email, role, database_1.default, true, "", "");
                return res.status(201).json({
                    user: {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        role: user.role,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                    },
                    credentials: {
                        username,
                        password,
                    },
                    token,
                });
            }
            catch (error) {
                console.error("Signup error:", error);
                return res.status(500).json({ error: "Failed to create user" });
            }
        };
        this.login = async (req, res) => {
            try {
                const { username, password } = req.body;
                const user = await database_1.default.user.findUnique({ where: { username } });
                if (!user) {
                    return res.status(401).json({ error: "Invalid credentials" });
                }
                const isValidPassword = await (0, auth_utils_1.comparePasswords)(password, user.password);
                if (!isValidPassword) {
                    return res.status(401).json({ error: "Invalid credentials" });
                }
                const token = (0, auth_utils_1.generateToken)(user);
                return res.status(200).json({
                    user: {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        role: user.role,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                    },
                    token,
                });
            }
            catch (error) {
                return res.status(500).json({ error: "Login failed" });
            }
        };
        this.forgotPassword = async (req, res) => {
            try {
                const { email } = req.body;
                const user = await database_1.default.user.findUnique({ where: { email } });
                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }
                const resetToken = (0, auth_utils_2.generateResetToken)();
                const resetTokenExpiry = new Date(Date.now() + 3600000);
                await database_1.default.user.update({
                    where: { email },
                    data: { resetToken, resetTokenExpiry },
                });
                await this.emailService.sendPasswordReset(email, resetToken);
                return res.status(200).json({ message: "Password reset email sent" });
            }
            catch (error) {
                console.error("Forgot password error:", error);
                return res.status(500).json({ error: "Failed to process request" });
            }
        };
        this.resetPassword = async (req, res) => {
            try {
                const { token, password } = req.body;
                const user = await database_1.default.user.findFirst({
                    where: {
                        resetToken: token,
                        resetTokenExpiry: { gt: new Date() },
                    },
                });
                if (!user) {
                    return res.status(400).json({ error: "Invalid or expired token" });
                }
                const hashedPassword = await (0, auth_utils_1.hashPassword)(password);
                await database_1.default.user.update({
                    where: { id: user.id },
                    data: {
                        password: hashedPassword,
                        resetToken: null,
                        resetTokenExpiry: null,
                    },
                });
                await this.emailService.sendPasswordChangeConfirmation(user.email);
                return res.status(200).json({ message: "Password updated successfully" });
            }
            catch (error) {
                console.error("Reset password error:", error);
                return res.status(500).json({ error: "Failed to reset password" });
            }
        };
        this.me = async (req, res) => {
            var _a;
            try {
                const userId = (_a = req === null || req === void 0 ? void 0 : req.loggedInUser) === null || _a === void 0 ? void 0 : _a.id;
                const user = await database_1.default.user.findUnique({
                    where: { id: userId },
                    include: {
                        staff: {
                            include: {
                                staffSignature: true,
                            },
                        },
                        patient: {
                            include: {
                                document: true,
                                appointments: true,
                                clientSignature: true,
                                parentSignature: true,
                            },
                        },
                    },
                });
                return res.status(200).json({ user });
            }
            catch (error) {
                console.error("ME route error:", error);
                return res.status(500).json({ error: "Failed to fetch logged-in user" });
            }
        };
        this.emailService = new email_service_1.EmailService();
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map