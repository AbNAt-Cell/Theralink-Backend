"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const moment_1 = __importDefault(require("moment"));
const database_1 = __importDefault(require("../config/database"));
const message_service_1 = require("../services/message.service");
const client_1 = require("@prisma/client");
class MessageController {
    async createMessage(req, res) {
        try {
            const _a = req.body, { body } = _a, rest = __rest(_a, ["body"]);
            const user = req.user;
            const { conversationId } = req.params;
            const newMessage = await database_1.default.message.create({
                data: Object.assign(Object.assign({}, rest), { user: {
                        connect: { id: user === null || user === void 0 ? void 0 : user.id },
                    }, conversationId }),
            });
            if (newMessage) {
                await database_1.default.conversation.update({
                    where: {
                        id: conversationId,
                    },
                    data: {
                        lastMessage: body,
                        updatedAt: (0, moment_1.default)(Date.now()).format("DDD MMM YYY"),
                    },
                });
            }
            return res.status(201).json({
                message: "Message created successfully",
                Message: newMessage,
            });
        }
        catch (error) {
            console.error("Create Message error:", error);
            return res.status(500).json({ error: "Failed to create Message" });
        }
    }
    async getMessages(req, res) {
        const user = req.user;
        const { page = "1", limit = "10" } = req.query;
        const parsedPage = Math.max(1, parseInt(page, 10));
        const parsedLimit = Math.max(1, parseInt(limit, 10));
        try {
            const messages = await database_1.default.message.findMany({
                orderBy: { createdAt: "desc" },
                where: {
                    conversationId: req.params.conversationId,
                    isDeleted: false,
                },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
            });
            const totalCount = await database_1.default.message.count({
                where: { userId: user === null || user === void 0 ? void 0 : user.id },
            });
            return res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                messages,
            });
        }
        catch (error) {
            console.error("Get Messages error:", error);
            return res.status(500).json({ error: "Failed to fetch Messages" });
        }
    }
    async getMessageById(req, res) {
        try {
            const { id } = req.params;
            const messageService = new message_service_1.MessageService();
            const message = await messageService.getSingleMessageService(id);
            if (!message) {
                return res.status(404).json({ error: "message not found" });
            }
            return res.status(200).json({ message });
        }
        catch (error) {
            console.error("Get Message error:", error);
            return res.status(500).json({ error: "Failed to fetch Message" });
        }
    }
    async updateMessage(req, res) {
        try {
            const { id } = req.params;
            const rest = __rest(req.body, []);
            const user = req.user;
            const Message = await database_1.default.message.update({
                where: { id, userId: user === null || user === void 0 ? void 0 : user.id },
                data: Object.assign({}, rest),
            });
            return res.status(200).json({
                message: "Message updated successfully",
                Message,
            });
        }
        catch (error) {
            console.error("update message error:", error);
            return res.status(500).json({ error: "Failed to update message" });
        }
    }
    async getUserMessage(req, res) {
        try {
            const user = req.user;
            const { isRead, isImportant, isSpam, isDeleted, role } = req.query;
            if (!(user === null || user === void 0 ? void 0 : user.id)) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            const filters = {
                isRead: isRead === "true" ? true : isRead === "false" ? false : undefined,
                isImportant: isImportant === "true"
                    ? true
                    : isImportant === "false"
                        ? false
                        : undefined,
                isSpam: isSpam === "true" ? true : isSpam === "false" ? false : undefined,
                isDeleted: isDeleted === "true"
                    ? true
                    : isDeleted === "false"
                        ? false
                        : undefined,
                role: undefined,
            };
            if (role) {
                const roleValue = role.toUpperCase();
                if (!Object.values(client_1.Role).includes(roleValue)) {
                    return res.status(400).json({ error: `Invalid role: ${role}` });
                }
                filters.role = roleValue;
            }
            const messageService = new message_service_1.MessageService();
            const { totalMessages, readMessages, unreadMessages, inboxMessages, importantMessages, messages, messagesByRole, } = await messageService.getUserMessageCounts(user.id, filters);
            return res.status(200).json({
                message: "Message counts has been fetched successfully",
                totalMessages,
                readMessages,
                unreadMessages,
                inboxMessages,
                importantMessages,
                messages,
                messagesByRole,
            });
        }
        catch (error) {
            console.error("Get message counts error:", {
                message: error.message,
                stack: error.stack,
            });
            return res.status(500).json({ error: "Failed to fetch message counts" });
        }
    }
    async markMessageAsRead(req, res) {
        try {
            const { id } = req.params;
            const user = req.user;
            const messageService = new message_service_1.MessageService();
            const newMessage = await messageService.updateMessageReadStatus(id, user === null || user === void 0 ? void 0 : user.id, true);
            return res.status(200).json({
                message: "Message updated successfully",
                newMessage,
            });
        }
        catch (error) {
            console.error("update message error:", error);
            return res.status(500).json({ error: "Failed to update message" });
        }
    }
    async markMessageAsUnRead(req, res) {
        try {
            const { id } = req.params;
            const user = req.user;
            const messageService = new message_service_1.MessageService();
            const newMessage = await messageService.updateMessageReadStatus(id, user === null || user === void 0 ? void 0 : user.id, false);
            return res.status(200).json({
                message: "Message updated successfully",
                newMessage,
            });
        }
        catch (error) {
            console.error("update message error:", error);
            return res.status(500).json({ error: "Failed to update message" });
        }
    }
    async markMessageAsImportant(req, res) {
        try {
            const { id } = req.params;
            const user = req.user;
            const messageService = new message_service_1.MessageService();
            const newMessage = await messageService.updateMessageImportantStatus(id, user === null || user === void 0 ? void 0 : user.id, true);
            return res.status(200).json({
                message: "Message updated successfully",
                newMessage,
            });
        }
        catch (error) {
            console.error("update message error:", error);
            return res.status(500).json({ error: "Failed to update message" });
        }
    }
    async markMessageAsUnImportant(req, res) {
        try {
            const { id } = req.params;
            const user = req.user;
            const messageService = new message_service_1.MessageService();
            const newMessage = await messageService.updateMessageImportantStatus(id, user === null || user === void 0 ? void 0 : user.id, false);
            return res.status(200).json({
                message: "Message updated successfully",
                newMessage,
            });
        }
        catch (error) {
            console.error("update message error:", error);
            return res.status(500).json({ error: "Failed to update message" });
        }
    }
    async addMessageToTrash(req, res) {
        try {
            const { id } = req.params;
            const user = req.user;
            const messageService = new message_service_1.MessageService();
            const newMessage = await messageService.updateMessageDeletedStatus(id, user === null || user === void 0 ? void 0 : user.id, true);
            return res.status(200).json({
                message: "Message updated successfully",
                newMessage,
            });
        }
        catch (error) {
            console.error("update message error:", error);
            return res.status(500).json({ error: "Failed to update message" });
        }
    }
    async removeMessageFromTrash(req, res) {
        try {
            const { id } = req.params;
            const user = req.user;
            const messageService = new message_service_1.MessageService();
            const newMessage = await messageService.updateMessageDeletedStatus(id, user === null || user === void 0 ? void 0 : user.id, false);
            return res.status(200).json({
                message: "Message updated successfully",
                newMessage,
            });
        }
        catch (error) {
            console.error("update message error:", error);
            return res.status(500).json({ error: "Failed to update message" });
        }
    }
    async deleteMessage(req, res) {
        try {
            const { id } = req.params;
            const messageService = new message_service_1.MessageService();
            const user = req.user;
            const message = await messageService.getSingleMessageService(id);
            if (!message) {
                return res.status(404).json({ error: "message not found" });
            }
            const alertmessage = await messageService.deleteMessageService(id, user.id);
            return res.status(200).json({
                message: alertmessage,
            });
        }
        catch (error) {
            console.error("Delete Message error:", error);
            return res.status(500).json({ error: "Failed to delete Message" });
        }
    }
}
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map