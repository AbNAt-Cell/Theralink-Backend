"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        this.transporter.verify((error) => {
            if (error) {
                console.log("SMTP Error:", error);
            }
            else {
                console.log("SMTP Server ready");
            }
        });
    }
    async sendCredentials(email, username, password) {
        try {
            console.log("Starting email send process...");
            const templatePath = path_1.default.join(__dirname, "../templates/credentials.hbs");
            console.log("Template path:", templatePath);
            const source = fs_1.default.readFileSync(templatePath, "utf-8");
            const template = handlebars_1.default.compile(source);
            const html = template({
                username,
                password,
            });
            const result = await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to: email,
                subject: "Your Theralink Account Credentials",
                html,
            });
            console.log("Email sent:", result);
        }
        catch (error) {
            console.error("Email sending failed:", error);
            throw error;
        }
    }
    async sendPasswordReset(email, token) {
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        const templatePath = path_1.default.join(__dirname, "../templates/reset-password.hbs");
        const source = fs_1.default.readFileSync(templatePath, "utf-8");
        const template = handlebars_1.default.compile(source);
        const html = template({ resetLink });
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Reset Your Theralink Password",
            html,
        });
    }
    async sendPasswordChangeConfirmation(email) {
        const templatePath = path_1.default.join(__dirname, "../templates/password-changed.hbs");
        const source = fs_1.default.readFileSync(templatePath, "utf-8");
        const template = handlebars_1.default.compile(source);
        const html = template({
            supportUrl: `${process.env.FRONTEND_URL}/support`,
        });
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Your Theralink Password Has Been Changed",
            html,
        });
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map