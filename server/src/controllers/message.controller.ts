import { Request, Response } from "express";
import { db } from "../utils/db.server";

export const createMessage = async (req: Request, res: Response) => {
  const { toId, fromId, content } = req.body;

  if (!toId || !fromId || !content) return res.json({ msg: "entity error" });

  try {
    const message = await db.message.create({
      data: {
        content: content,
        fromId: parseInt(fromId),
        toId: parseInt(toId),
      },
    });

    return res.json(message);
  } catch (e: any) {
    console.log(e);
    return res.json({ msg: "error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { toId, fromId } = req.params;

  if (!toId || !fromId) return res.json({ msg: "entity error" });

  try {
    const messages = await db.message.findMany({
      where: {
        OR: [
          { fromId: parseInt(fromId), toId: parseInt(toId) },
          { fromId: parseInt(toId), toId: parseInt(fromId) },
        ],
      },
    });

    return res.json(messages);
  } catch (e: any) {
    return res.json({ msg: "error" });
  }
};
