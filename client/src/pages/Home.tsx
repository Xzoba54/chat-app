import { useEffect, useState } from "react";
import axios from "../utils/axios";
import styled from "styled-components";
import User from "../components/User";
import { io } from "socket.io-client";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;
const Users = styled.div`
  display: flex;
  flex-direction: column;
`;

interface User {
  username: string;
}

const initializeUsers: User[] = [
  {
    username: "xd",
  },
];

const Home = () => {
  // const [users, setUsers] = useState<User[]>(initializeUsers);

  // useEffect(() => {
  //   getUsers();
  // }, []);

  // const getUsers = async () => {
  //   const res = await axios.get("/user");

  //   setUsers(res.data);
  // };

  // return (
  //   <Container>
  //     <Users>
  //       {users.map((user, index) => (
  //         <User key={index} username={user.username} />
  //       ))}
  //     </Users>
  //   </Container>
  // );
  return <span>home</span>;
};

export default Home;
