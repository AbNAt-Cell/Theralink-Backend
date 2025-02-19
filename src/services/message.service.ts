import prisma from "src/config/database";

export class MessageService {
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
        id,
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
}
