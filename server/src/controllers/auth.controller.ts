import { Request, Response } from "express";
import { db } from "../utils/db.server";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) return res.json({ msg: "Email and username are required" });

    const newUser = await db.user.create({
      data: {
        email: email,
        username: username,
      },
    });

    return res.json(newUser);
  } catch (e: any) {
    return res.json({ msg: "Failed to create user" });
  }
};

export const checkUser = async (req: Request, res: Response) => {
  console.log("xd");
  try {
    const { email } = req.body;

    if (!email) return res.json({ msg: "Email is required" });

    const user = await db.user.findUnique({ where: { email: email } });
    if (!user) return res.json(user);

    const payload = {
      sub: user.id,
    };
    const accessToken = jwt.sign(payload, "REFRESH_TOKEN", { expiresIn: "1m" });
    const refreshToken = jwt.sign(payload, "ACCESS_TOKEN", { expiresIn: "4m" });

    res.cookie("refresh-token", refreshToken, { httpOnly: true });
    return res.json({ ...user, token: accessToken });
  } catch (e: any) {
    return res.json({ msg: "Failed to create user", error: true });
  }
};
