import { Role } from "@prisma/client";
import prisma from "../config/database";

interface MessageFilters {
  isRead?: boolean;
  isImportant?: boolean;
  isSpam?: boolean;
  isDeleted?: boolean;
  role?: Role;
}

export class MessageService {
  async createMessageService(
    body: string,
    userId: string,
    conversationId: string,
    toUserId: string,
    image: string[]
  ) {
    // Validating sender (userId) exists
    const sender = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!sender) {
      throw new Error(`Sender with userId ${userId} does not exist`);
    }

    // Validating recipient (toUserId) exists
    const recipient = await prisma.user.findUnique({
      where: { id: toUserId },
    });
    if (!recipient) {
      throw new Error(`Recipient with toUserId ${toUserId} does not exist`);
    }

    // Validating conversation exists
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });
    if (!conversation) {
      throw new Error(
        `Conversation with conversationId ${conversationId} does not exist`
      );
    }
    const newMessage = await prisma.message.create({
      data: {
        body,
        userId,
        toUserId,
        conversationId,
        image,
      },
    });

    // Update the conversation's last message
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { lastMessage: body },
    });

    return newMessage;
  }
  async updateMessageReadStatus(id: string, userId: string, isRead: boolean) {
    const newMessage = await prisma.message.update({
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

  async updateMessageDeletedStatus(
    id: string,
    userId: string,
    isDeleted: boolean
  ) {
    const newMessage = await prisma.message.update({
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

  async updateMessageImportantStatus(
    id: string,
    userId: string,
    isImportant: boolean
  ) {
    const newMessage = await prisma.message.update({
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

  async getSingleMessageService(id: string) {
    const newMessage = await prisma.message.findUnique({
      where: {
        id,
      },
    });

    return newMessage;
  }

  async getAllMessageService(id: string, userId: string) {
    const newMessage = await prisma.message.findMany({
      where: {
        conversationId: id,
        userId,
      },
    });

    return newMessage;
  }

  async deleteMessageService(id: string, userId: string) {
    await prisma.message.delete({
      where: {
        id,
        userId,
      },
    });

    return "Message deleted successfully";
  }

  // async getUserMessageCounts(userId: string) {
  //   // Validate user exists
  //   const user = await prisma.user.findUnique({
  //     where: { id: userId },
  //   });

  //   if (!user) {
  //     throw new Error(`User with ID ${userId} does not exist`);
  //   }

  //   // Fetch message counts using Prisma count queries
  //   const [totalMessages, readMessages, unreadMessages, inboxMessages, importantMessages] = await Promise.all([
  //     // Total messages (sent or received, excluding deleted)
  //     prisma.message.count({
  //       where: {
  //         OR: [{ userId }, { toUserId: userId }],
  //         isDeleted: false,
  //       },
  //     }),
  //     // Read messages (received by user)
  //     prisma.message.count({
  //       where: {
  //         toUserId: userId,
  //         isRead: true,
  //         isDeleted: false,
  //       },
  //     }),
  //     // Unread messages (received by user)
  //     prisma.message.count({
  //       where: {
  //         toUserId: userId,
  //         isRead: false,
  //         isDeleted: false,
  //       },
  //     }),
  //     // Inbox messages (received by user, excluding deleted)
  //     prisma.message.count({
  //       where: {
  //         toUserId: userId,
  //         isDeleted: false,
  //       },
  //     }),
  //     // Important (liked) messages (received by user)
  //     prisma.message.count({
  //       where: {
  //         toUserId: userId,
  //         isImportant: true,
  //         isDeleted: false,
  //       },
  //     }),
  //   ]);

  //   return {
  //     totalMessages,
  //     readMessages,
  //     unreadMessages,
  //     inboxMessages,
  //     importantMessages,
  //   };
  // }

  // async getUserMessageCounts(userId: string, filters: MessageFilters = {}) {
  //   // Validate user exists
  //   const user = await prisma.user.findUnique({
  //     where: { id: userId },
  //   });

  //   if (!user) {
  //     throw new Error(`User with ID ${userId} does not exist`);
  //   }

  //   // Build where clause with filters
  //   const whereClause: any = {
  //     OR: [{ userId }, { toUserId: userId }],
  //   };

  //   // Apply filters if provided
  //   if (filters.isRead !== undefined) {
  //     whereClause.isRead = filters.isRead;
  //   }
  //   if (filters.isImportant !== undefined) {
  //     whereClause.isImportant = filters.isImportant;
  //   }
  //   if (filters.isSpam !== undefined) {
  //     whereClause.isSpam = filters.isSpam;
  //   }
  //   if (filters.isDeleted !== undefined) {
  //     whereClause.isDeleted = filters.isDeleted;
  //   } else {
  //     whereClause.isDeleted = false; // Default to excluding deleted messages
  //   }

  //   // Fetch filtered messages
  //   const messages = await prisma.message.findMany({
  //     where: whereClause,
  //     select: {
  //       userId: true,
  //       toUserId: true,
  //       isRead: true,
  //       isImportant: true,
  //     },
  //   });

  //   // Compute counts in memory
  //   const totalMessages = messages.length;
  //   const inboxMessages = messages.filter((msg) => msg.toUserId === userId).length;
  //   const readMessages = messages.filter(
  //     (msg) => msg.toUserId === userId && msg.isRead
  //   ).length;
  //   const unreadMessages = messages.filter(
  //     (msg) => msg.toUserId === userId && !msg.isRead
  //   ).length;
  //   const importantMessages = messages.filter(
  //     (msg) => msg.toUserId === userId && msg.isImportant
  //   ).length;

  //   return {
  //     totalMessages,
  //     readMessages,
  //     unreadMessages,
  //     inboxMessages,
  //     importantMessages,
  //     messages
  //   };
  // }

  async getUserMessageCounts(userId: string, filters: MessageFilters = {}) {
    console.log("Filter query paramter:", filters);
    // Validate user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} does not exist`);
    }

    // Build base where clause
    const whereClause: any = {
      OR: [{ userId }, { toUserId: userId }],
      isDeleted: filters.isDeleted ?? false,
    };

    // Apply additional filters if provided
    if (filters.isRead !== undefined) {
      whereClause.isRead = filters.isRead;
    }
    if (filters.isImportant !== undefined) {
      whereClause.isImportant = filters.isImportant;
    }
    if (filters.isSpam !== undefined) {
      whereClause.isSpam = filters.isSpam;
    }

    // If role filter is provided, apply it to the sender or recipient
    if (filters.role !== undefined) {
      whereClause.OR = [
        { userId, user: { role: filters.role } },
        { toUserId: userId, user: { role: filters.role } },
      ];
    }

    console.log("Where clause paramter:", whereClause);

    // Fetch counts using Prisma's count queries
    const [
      totalMessages,
      inboxMessages,
      readMessages,
      unreadMessages,
      importantMessages,
    ] = await Promise.all([
      // Total messages (sent or received)
      prisma.message.count({ where: whereClause }),
      // Inbox messages (received by user)
      prisma.message.count({
        where: { ...whereClause, toUserId: userId },
      }),
      // Read messages (received by user)
      prisma.message.count({
        where: { ...whereClause, toUserId: userId, isRead: true },
      }),
      // Unread messages (received by user)
      prisma.message.count({
        where: { ...whereClause, toUserId: userId, isRead: false },
      }),
      // Important messages (received by user)
      prisma.message.count({
        where: { ...whereClause, toUserId: userId, isImportant: true },
      }),
    ]);

    // fetchine the message list
    const messages = await prisma.message.findMany({
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

    // Grouping messages by role
    const messagesByRole = messages.reduce((acc, msg) => {
      const role = msg.user.role;
      if (!acc[role]) {
        acc[role] = [];
      }
      acc[role].push(msg);
      return acc;
    }, {} as Record<Role, any[]>);

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
