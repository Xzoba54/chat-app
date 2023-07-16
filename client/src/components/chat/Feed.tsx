import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "../../utils/axios";
import useAuth from "../../hooks/useAuth";
import { io } from "socket.io-client";
// import { socket } from "../../utils/socket";

const Container = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
`;

const MessageFromMe = styled.div`
  padding: 1rem;
  background-color: #bebebe;
  margin: 1rem;
  align-self: flex-end;
  border-radius: 8px;
`;
const Message = styled.div`
  padding: 1rem;
  background-color: #bebebe;
  margin: 1rem;
  border-radius: 8px;
`;
const MessageContent = styled.span``;

interface Message {
  fromId: number;
  content: string;
}

type Props = {
  id: number;
  messages: Message[];
};

const Feed = ({ id, messages }: Props) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  const { auth } = useAuth();

  useEffect(() => {
    if (!messageEndRef.current) return;

    messageEndRef.current.scrollIntoView();
  }, [messages]);

  return (
    <Container>
      {messages ? (
        messages.map((message, index) => {
          if (message.fromId === auth.id) {
            return (
              <MessageFromMe key={index}>
                <MessageContent>{message.content}</MessageContent>
              </MessageFromMe>
            );
          }

          return (
            <Message key={index}>
              <MessageContent>{message.content}</MessageContent>
            </Message>
          );
        })
      ) : (
        <span>no messages</span>
      )}
      <div ref={messageEndRef} />
    </Container>
  );
};

export default Feed;
