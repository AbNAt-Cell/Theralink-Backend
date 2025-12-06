"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResetToken = exports.generateToken = exports.comparePasswords = exports.hashPassword = exports.generatePassword = exports.generateUsername = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const generateUsername = (email) => {
    const prefix = email.split('@')[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 5);
    return `${prefix}_${timestamp}${random}`;
};
exports.generateUsername = generateUsername;
const generatePassword = () => {
    const length = 12;
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';
    const allChars = lowercase + uppercase + numbers + symbols;
    let password = lowercase[Math.floor(Math.random() * lowercase.length)] +
        uppercase[Math.floor(Math.random() * uppercase.length)] +
        numbers[Math.floor(Math.random() * numbers.length)] +
        symbols[Math.floor(Math.random() * symbols.length)];
    for (let i = password.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }
    return password
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
};
exports.generatePassword = generatePassword;
const hashPassword = async (password) => {
    const salt = await bcrypt_1.default.genSalt(12);
    return bcrypt_1.default.hash(password, salt);
};
exports.hashPassword = hashPassword;
const comparePasswords = async (password, hashedPassword) => {
    return bcrypt_1.default.compare(password, hashedPassword);
};
exports.comparePasswords = comparePasswords;
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET, {
        expiresIn: '24h',
        algorithm: 'HS256'
    });
};
exports.generateToken = generateToken;
const generateResetToken = () => {
    return crypto_1.default.randomBytes(32).toString('hex');
};
exports.generateResetToken = generateResetToken;
//# sourceMappingURL=auth.utils.js.map