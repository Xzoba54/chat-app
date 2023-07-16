import { Request, Response } from "express";
import { db } from "../utils/db.server";

export const getAllUsers = async (req: Request, res: Response) => {
  

  try {
    const users = await db.user.findMany();

    return res.json(users);
  } catch (e: any) {
    return res.json({ msg: "error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await db.user.findUnique({ where: { id: parseInt(id) } });

    return res.json(user);
  } catch (e: any) {
    return res.json({ msg: "error" });
  }
};
