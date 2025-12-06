"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupMessageSocket;
const redis_1 = __importDefault(require("../config/redis"));
const message_service_1 = require("../services/message.service");
function setupMessageSocket(io) {
    io.on("connection", (socket) => {
        socket.on("register_user", async ({ userId }) => {
            await redis_1.default.set(`active_users:${userId}`, socket.id);
            socket.join(`user:${userId}`);
            io.emit("user_joined", `The user with ${userId} has been connected`);
        });
        socket.on("send_dm", async (data) => {
            const { toUserId, body, userId, conversationId, image } = data;
            const toSockerUserId = await redis_1.default.get(`active_users:${toUserId}`);
            const messageservice = new message_service_1.MessageService();
            let message = await messageservice.createMessageService(body, userId, conversationId, toUserId, image);
            if (toSockerUserId) {
                io.to(`user:${toUserId}`).emit("receive_dm", message);
            }
            io.to(`user:${userId}`).emit("receive_dm", message);
        });
        socket.on("user_typing", async (data) => {
            const { toUserId } = data;
            const toSockerUserId = await redis_1.default.get(`active_users:${toUserId}`);
            if (toSockerUserId) {
                io.to(`user:${toUserId}`).emit("user_typing", { user: data.userId });
            }
        });
        socket.on("user_stopped_typing", async (data) => {
            const { toUserId } = data;
            const toSockerUserId = await redis_1.default.get(`active_users:${toUserId}`);
            if (toSockerUserId) {
                io.to(`user:${toSockerUserId}`).emit("user_stopped_typing", {
                    user: data.userId,
                });
            }
        });
        socket.on("disconnect", async () => {
            try {
                const redisKeys = await redis_1.default.keys(`active_users:*`);
                const userKey = await Promise.all(redisKeys.map(async (key) => {
                    const value = await redis_1.default.get(key);
                    return value === socket.id ? key : null;
                })).then((resultKey) => resultKey.find((key) => key !== null));
                const userId = userKey === null || userKey === void 0 ? void 0 : userKey.split(":")[1];
                if (userId) {
                    await redis_1.default.del(`active_users:${userId}`);
                }
            }
            catch (error) {
                console.log(`Disconnection error`, error);
            }
        });
    });
}
//# sourceMappingURL=message.socket.js.map