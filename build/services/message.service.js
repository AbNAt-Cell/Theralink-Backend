"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const database_1 = __importDefault(require("../config/database"));
class MessageService {
    async createMessageService(body, userId, conversationId, toUserId, image) {
        const sender = await database_1.default.user.findUnique({
            where: { id: userId },
        });
        if (!sender) {
            throw new Error(`Sender with userId ${userId} does not exist`);
        }
        const recipient = await database_1.default.user.findUnique({
            where: { id: toUserId },
        });
        if (!recipient) {
            throw new Error(`Recipient with toUserId ${toUserId} does not exist`);
        }
        const conversation = await database_1.default.conversation.findUnique({
            where: { id: conversationId },
        });
        if (!conversation) {
            throw new Error(`Conversation with conversationId ${conversationId} does not exist`);
        }
        const newMessage = await database_1.default.message.create({
            data: {
                body,
                userId,
                toUserId,
                conversationId,
                image,
            },
        });
        await database_1.default.conversation.update({
            where: { id: conversationId },
            data: { lastMessage: body },
        });
        return newMessage;
    }
    async updateMessageReadStatus(id, userId, isRead) {
        const newMessage = await database_1.default.message.update({
            where: {
                id,
                toUserId: userId,
            },
            data: {
                isRead,
            },
        });
        return newMessage;
    }
    async updateMessageDeletedStatus(id, userId, isDeleted) {
        const newMessage = await database_1.default.message.update({
            where: {
                id,
                toUserId: userId,
            },
            data: {
                isDeleted,
            },
        });
        return newMessage;
    }
    async updateMessageImportantStatus(id, userId, isImportant) {
        const newMessage = await database_1.default.message.update({
            where: {
                id,
                toUserId: userId,
            },
            data: {
                isImportant,
            },
        });
        return newMessage;
    }
    async getSingleMessageService(id) {
        const newMessage = await database_1.default.message.findUnique({
            where: {
                id,
            },
        });
        return newMessage;
    }
    async getAllMessageService(id, userId) {
        const newMessage = await database_1.default.message.findMany({
            where: {
                conversationId: id,
                userId,
            },
        });
        return newMessage;
    }
    async deleteMessageService(id, userId) {
        await database_1.default.message.delete({
            where: {
                id,
                userId,
            },
        });
        return "Message deleted successfully";
    }
    async getUserMessageCounts(userId, filters = {}) {
        var _a;
        console.log("Filter query paramter:", filters);
        const user = await database_1.default.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new Error(`User with ID ${userId} does not exist`);
        }
        const whereClause = {
            OR: [{ userId }, { toUserId: userId }],
            isDeleted: (_a = filters.isDeleted) !== null && _a !== void 0 ? _a : false,
        };
        if (filters.isRead !== undefined) {
            whereClause.isRead = filters.isRead;
        }
        if (filters.isImportant !== undefined) {
            whereClause.isImportant = filters.isImportant;
        }
        if (filters.isSpam !== undefined) {
            whereClause.isSpam = filters.isSpam;
        }
        if (filters.role !== undefined) {
            whereClause.OR = [
                { userId, user: { role: filters.role } },
                { toUserId: userId, user: { role: filters.role } },
            ];
        }
        console.log("Where clause paramter:", whereClause);
        const [totalMessages, inboxMessages, readMessages, unreadMessages, importantMessages,] = await Promise.all([
            database_1.default.message.count({ where: whereClause }),
            database_1.default.message.count({
                where: Object.assign(Object.assign({}, whereClause), { toUserId: userId }),
            }),
            database_1.default.message.count({
                where: Object.assign(Object.assign({}, whereClause), { toUserId: userId, isRead: true }),
            }),
            database_1.default.message.count({
                where: Object.assign(Object.assign({}, whereClause), { toUserId: userId, isRead: false }),
            }),
            database_1.default.message.count({
                where: Object.assign(Object.assign({}, whereClause), { toUserId: userId, isImportant: true }),
            }),
        ]);
        const messages = await database_1.default.message.findMany({
            where: whereClause,
            select: {
                id: true,
                body: true,
                isRead: true,
                isImportant: true,
                isDeleted: true,
                userId: true,
                toUserId: true,
                user: { select: { role: true, firstName: true, lastName: true } },
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
        });
        const messagesByRole = messages.reduce((acc, msg) => {
            const role = msg.user.role;
            if (!acc[role]) {
                acc[role] = [];
            }
            acc[role].push(msg);
            return acc;
        }, {});
        return {
            totalMessages,
            inboxMessages,
            readMessages,
            unreadMessages,
            importantMessages,
            messagesByRole,
            messages,
        };
    }
}
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map