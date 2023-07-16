import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { useRef, useState } from "react";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase.config";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import useAuth from "../hooks/useAuth";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Provider = styled.div`
  .provider {
    margin: 12px;
    width: 34px;
    height: 34px;
    cursor: pointer;
  }
`;
const Title = styled.span`
  font-size: 32px;
  margin-bottom: 24px;
`;
const Input = styled.input`
  padding: 6px 4px;
  margin-bottom: 8px;
  font-size: 18px;
  outline: none;
  border: 1px solid #323232;
`;
const Button = styled.div`
  padding: 8px 12px;
  background-color: #f2f2f2;

  &:hover {
    background-color: #dddddd;
  }
`;
const ButtonText = styled.span``;

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLoginWithEmailAndPassword = async () => {
    const users = await axios.get("/user");

    // try {
    //   const res = await signInWithEmailAndPassword(firebaseAuth, emailRef.current?.value || "", passwordRef.current?.value || "");

    //   console.log(res);
    // } catch (e: any) {
    //   setError(e.code);
    // }
  };

  const { setAuth } = useAuth();

  const handleLoginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(firebaseAuth, provider);

      const checkUser = await axios.post("/auth/check-user", { email: user.email });

      if (checkUser.data) {
        setAuth({ id: checkUser.data!.id, username: checkUser.data!.username });

        navigate("/");
      } else {
        const newUser = await axios.post("/auth/create-user", { email: user.email, username: user.displayName });
        setAuth({ id: newUser.data!.id, username: newUser.data!.username });

        navigate("/");
      }
    } catch (e: any) {
      setError(e.code);
    }
  };

  return (
    <Container>
      <Form>
        <Title>Login</Title>
        <Input ref={emailRef} type="email" placeholder="Email" />
        <Input ref={passwordRef} type="password" placeholder="Password" />

        <Provider onClick={handleLoginWithGoogle}>
          <FcGoogle className="provider" />
        </Provider>

        <Button onClick={handleLoginWithEmailAndPassword}>
          <ButtonText>Login</ButtonText>
        </Button>
        <span>{error}</span>
      </Form>
    </Container>
  );
};

export default Login;
