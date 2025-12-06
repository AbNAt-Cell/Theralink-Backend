"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationController = void 0;
const database_1 = __importDefault(require("../config/database"));
class ConversationController {
    async createConversation(req, res) {
        try {
            const { lastMessage } = req.body;
            const { patientid } = req.params;
            const user = req.user;
            const patient = await database_1.default.user.findUnique({
                where: { id: patientid },
            });
            if (!patient) {
                return res.status(400).json({ error: "Patient not found" });
            }
            const conflictingConversation = await database_1.default.conversation.findFirst({
                where: {
                    AND: [
                        {
                            participants: {
                                some: { userId: user.id },
                            },
                        },
                        {
                            participants: {
                                some: { userId: patientid },
                            },
                        },
                        {
                            participants: {
                                none: {
                                    userId: {
                                        notIn: [user.id, patientid],
                                    },
                                },
                            },
                        },
                    ],
                },
                include: {
                    participants: true,
                },
            });
            if (conflictingConversation) {
                return res.status(200).json({
                    conversation: conflictingConversation,
                });
            }
            const newConversation = await database_1.default.conversation.create({
                data: {
                    lastMessage: lastMessage || "New conversation",
                    participants: {
                        create: [{ userId: user.id }, { userId: patientid }],
                    },
                },
            });
            return res.status(201).json({
                message: "Conversation created successfully",
                conversation: newConversation,
            });
        }
        catch (error) {
            console.error("Create Conversation error:", error);
            return res.status(500).json({ error: "Failed to create conversation" });
        }
    }
    async getConversations(req, res) {
        const user = req.user;
        const { page = "1", limit = "10" } = req.query;
        const parsedPage = Math.max(1, parseInt(page, 10));
        const parsedLimit = Math.max(1, parseInt(limit, 10));
        try {
            const conversations = await database_1.default.conversation.findMany({
                orderBy: { createdAt: "desc" },
                where: { participants: { some: { userId: user.id } } },
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
                include: {
                    participants: {
                        where: {
                            userId: {
                                not: user === null || user === void 0 ? void 0 : user.id,
                            },
                        },
                        select: {
                            user: {
                                select: {
                                    role: true,
                                    lastName: true,
                                    firstName: true,
                                },
                            },
                        },
                    },
                },
            });
            const totalCount = await database_1.default.conversation.count({
                where: {
                    participants: {
                        some: { userId: user === null || user === void 0 ? void 0 : user.id },
                    },
                },
            });
            return res.status(200).json({
                totalCount,
                totalPages: Math.ceil(totalCount / parsedLimit),
                currentPage: parsedPage,
                conversations,
            });
        }
        catch (error) {
            console.error("Get Conversations error:", error);
            return res.status(500).json({ error: "Failed to fetch Conversations" });
        }
    }
    async getConversationById(req, res) {
        try {
            const { id } = req.params;
            const user = req.user;
            const conversation = await database_1.default.conversation.findFirst({
                where: { id, participants: { some: { userId: user.id } } },
                include: { participants: true, messages: true },
            });
            if (!conversation) {
                return res.status(404).json({ error: "Conversation not found" });
            }
            return res.status(200).json({ conversation });
        }
        catch (error) {
            console.error("Get Conversation error:", error);
            return res.status(500).json({ error: "Failed to fetch Conversation" });
        }
    }
    async updateConversation(req, res) {
        try {
            const { id } = req.params;
            const { lastMessage } = req.body;
            const user = req.user;
            const Conversation = await database_1.default.conversation.update({
                where: {
                    id,
                    participants: {
                        some: { userId: user === null || user === void 0 ? void 0 : user.id },
                    },
                },
                data: { lastMessage },
            });
            return res.status(200).json({
                message: "Conversation updated successfully",
                Conversation,
            });
        }
        catch (error) {
            console.error("Updateppointment error:", error);
            return res.status(500).json({ error: "Failed to Updateppointment" });
        }
    }
    async deleteConversation(req, res) {
        try {
            const { id } = req.params;
            const user = req.user;
            await database_1.default.conversation.delete({
                where: { id, participants: { some: { userId: user.id } } },
            });
            return res.status(200).json({
                message: "Conversation deleted successfully",
            });
        }
        catch (error) {
            console.error("Delete Conversation error:", error);
            return res.status(500).json({ error: "Failed to delete Conversation" });
        }
    }
}
exports.ConversationController = ConversationController;
//# sourceMappingURL=conversation.controller.js.map