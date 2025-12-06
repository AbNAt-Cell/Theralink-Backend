"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const database_1 = __importDefault(require("../config/database"));
const client_1 = require("@prisma/client");
class UserController {
    async getUsers(req, res) {
        try {
            const { username, role, email, limit = "9", page = "1" } = req.query;
            const parsedLimit = Number(limit) || 9;
            const parsedPage = Number(page) || 1;
            const where = {};
            if (typeof username === "string" && username.trim()) {
                where.username = {
                    contains: username,
                    mode: "insensitive",
                };
            }
            if (typeof email === "string" && email.trim()) {
                where.email = {
                    contains: email,
                    mode: "insensitive",
                };
            }
            if (typeof role === "string" && Object.values(client_1.Role).includes(role)) {
                where.role = role;
            }
            const users = await database_1.default.user.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalUsers = await database_1.default.user.count({ where });
            return res.status(200).json({
                users,
                totalUsers,
                currentPage: parsedPage,
                totalPages: Math.ceil(totalUsers / parsedLimit),
            });
        }
        catch (error) {
            console.error("Get Users error:", error);
            return res.status(500).json({ error: "Failed to fetch users" });
        }
    }
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await database_1.default.user.findUnique({
                where: { id },
            });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.status(200).json({ user });
        }
        catch (error) {
            console.error("Get user error:", error);
            return res.status(500).json({ error: "Failed to fetch user" });
        }
    }
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const userExist = await database_1.default.user.findUnique({
                where: { id },
            });
            if (!userExist) {
                return res.status(404).json({ error: "User not found" });
            }
            const user = await database_1.default.user.update({
                where: { id },
                data: Object.assign({}, req.body),
            });
            return res.status(200).json({
                message: "User updated successfully",
                user,
            });
        }
        catch (error) {
            console.error("Update User error:", error);
            return res.status(500).json({ error: "Failed to update User" });
        }
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await database_1.default.user.findUnique({
                where: { id },
            });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            await database_1.default.user.delete({
                where: { id },
            });
            return res.status(200).json({
                message: "User deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete user error:", error);
            return res.status(500).json({ error: "Failed to delete user" });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map