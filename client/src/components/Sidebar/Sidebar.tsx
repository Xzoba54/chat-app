import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import styled from "styled-components";
import User from "../User";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { io } from "socket.io-client";
// import { socket } from "../../utils/socket";

const Container = styled.div`
  height: 100vh;
  display: flex;
`;
const Users = styled.div`
  display: flex;
  flex-direction: column;
`;

interface User {
  id: number;
  username: string;
}

const initializeUsers: User[] = [
  {
    id: 0,
    username: "initial",
  },
];

const Sidebar = () => {
  const [users, setUsers] = useState<User[]>(initializeUsers);
  const location = useLocation();
  const { auth } = useAuth();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get("/user");

      if (res.data.msg !== "error") {
        setUsers(res.data);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Users>
        {users.map((user, index) => {
          if (user.id === auth.id) return;

          return <User key={index} username={user.username} id={user.id} isActive={location.pathname === `/${user.id}` ? "true" : "false"} />;
        })}
      </Users>
    </Container>
  );
};

export default Sidebar;
