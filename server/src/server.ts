import express, { Express, Response } from "express";
import cors from "cors";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";

import { AuthRouter } from "./routes/auth.route";
import { UserRouter } from "./routes/user.route";
import { MessageRouter } from "./routes/message.route";

const app: Express = express();

dotenv.config();
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/message", MessageRouter);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let usersOnline = new Map();

io.on("connection", (socket: Socket) => {
  socket.on("user-connected", (userId) => {
    usersOnline.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const user = usersOnline.get(data.toId);

    if (!user) return;

    socket.to(user).emit("msg-receive", data);
  });

  socket.on("disconnect", () => {
    usersOnline.forEach((socketId, userId) => {
      if (socketId === socket.id) {
        usersOnline.delete(userId);
      }
    });
    console.log("A user disconnected");
    console.log(usersOnline);
  });
});
