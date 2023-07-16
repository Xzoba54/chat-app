import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/chat/Header";
import { useEffect, useRef, useState } from "react";
import axios from "../utils/axios";
import MessageBar from "../components/chat/MessageBar";
import Feed from "../components/chat/Feed";
import useAuth from "../hooks/useAuth";
import { io, Socket } from "socket.io-client";
// import { socket } from "../utils/socket";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f2f2f2;
`;

interface User {
  username: string | undefined;
  avatar: string | undefined;
}

interface Message {
  fromId: number;
  content: string;
}

const Chat = () => {
  const [user, setUser] = useState<User>();
  const [messages, setMessages] = useState<Message[]>([]);

  const { id } = useParams();
  const { auth } = useAuth();

  // const socket = io("http://localhost:5000");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (auth.id === -1) return;

    console.log("new socket");

    const newSocket = io("http://localhost:5000");
    newSocket.emit("user-connected", auth.id);

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    if (auth.id !== -1 && socket) {
      socket.emit("user-connected", auth.id);
    }
  }, [id]);

  useEffect(() => {
    fetchUserData();
    fetchMessages();
  }, [id]);

  const fetchMessages = async () => {
    if (auth.id === -1) return;

    try {
      const res = await axios.get(`/message/${id}/${auth.id}`);

      setMessages(res.data);
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleNewMessage = (data: Message) => {
    if (!id || data.fromId !== parseInt(id)) return;
    setMessages((prev) => [...prev, data]);
  };

  useEffect(() => {
    const fetch = () => {
      console.log("fetch");
      if (socket) socket.on("msg-receive", handleNewMessage);
    };

    fetch();

    return () => {
      if (socket) socket.off("msg-receive", handleNewMessage);
    };
  }, [handleNewMessage]);

  const fetchUserData = async () => {
    const res = await axios.get(`/user/${id}`);

    setUser(res.data);
  };

  const handleSendMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <Container>
      <Header username={user?.username || "error"} avatar="https://cdn.discordapp.com/attachments/753648968751120443/1117084268779274320/20220329_110705.jpg" />
      <Feed messages={messages} id={id ? parseInt(id) : -1} />
      <MessageBar socket={socket} onSendMessage={handleSendMessage} id={id ? parseInt(id) : -1} />
    </Container>
  );
};

export default Chat;
