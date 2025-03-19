import { Socket, Server } from "socket.io";
import redisClient from "src/config/redis";
import { MessageService } from "src/services/message.service";
export default function setupMessageSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    // console.log(`User Connected: ${socket.id}`);

    /**
     * @description Register user for dm
     */
    socket.on("register_user", async ({ userId }) => {
      await redisClient.set(`active_users:$`, JSON.stringify(userId));
      socket.join(`user:${userId}`); // join a room
      io.emit;
    });

    // Send dm Event
    socket.on("send_dm", async (data) => {
      const { toUserId, body, userId, subject, conversationId } = data;
      const toSockerUserId = await redisClient.get(toUserId);
      if (toSockerUserId) {
        const messageservice = new MessageService();
        let message = await messageservice.createMessageService(
          toUserId,
          body,
          userId,
          subject,
          conversationId
        );
        // create the message from db
        io.to(toSockerUserId).emit("receive_dm", message);
      }
    });

    // Start Typing Event
    socket.on("user_typing", async (data) => {
      const { toUserId } = data;
      const toSockerUserId = await redisClient.get(toUserId);

      if (toSockerUserId) {
        io.to(toSockerUserId).emit("user_typing", { user: data.userId });
      }
    });

    // Stopped Typing Event
    socket.on("user_stopped_typing", async (data) => {
      const { toUserId } = data;
      const toSockerUserId = await redisClient.get(toUserId);

      if (toSockerUserId) {
        io.to(toSockerUserId).emit("user_stopped_typing", {
          user: data.userId,
        });
      }
    });
  });
}
