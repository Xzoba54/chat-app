import { useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "../../utils/axios";
import useAuth from "../../hooks/useAuth";
import { Socket, io } from "socket.io-client";
// import { socket } from "../../utils/socket";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #ddd;
  gap: 24px;
`;
const Input = styled.input`
  padding: 0.8rem;
  border: none;
  background-color: #ebebeb;
  border-radius: 8px;
  border: 1px solid #a1a1a1;
  width: 500px;
  font-size: 16px;

  outline: none;
`;
const Button = styled.div`
  padding: 0.85rem;
  background-color: #ebebeb;
  border-radius: 8px;
  border: 1px solid #a1a1a1;
  cursor: pointer;
`;
const ButtonText = styled.span``;

interface Message {
  fromId: number;
  content: string;
}

type Props = {
  id: number;
  socket: Socket | null;
  onSendMessage: (message: Message) => void;
};

const MessageBar = ({ socket, id, onSendMessage }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { auth } = useAuth();

  const sendMessage = async () => {
    if (!inputRef.current?.value || auth.id === -1) return;

    try {
      const res = await axios.post("/message/create", {
        content: inputRef.current?.value,
        fromId: auth.id,
        toId: id,
      });

      if (socket) {
        socket.emit("send-msg", {
          content: inputRef.current?.value,
          toId: id,
          fromId: auth.id,
        });

        onSendMessage({ content: inputRef.current.value, fromId: auth.id });
      }
    } catch (e: any) {
      console.log(e);
    } finally {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (!inputRef.current) return;

    inputRef.current.focus();

    const handleSendMessage = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    };

    window.addEventListener("keydown", handleSendMessage);

    return () => {
      window.removeEventListener("keydown", handleSendMessage);
    };
  }, [id, sendMessage]);

  return (
    <Container>
      <Input ref={inputRef} type="text" placeholder="Type something..." />
      <Button onClick={sendMessage}>
        <ButtonText>Send</ButtonText>
      </Button>
    </Container>
  );
};

export default MessageBar;
