import React, { useRef } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { auth } = useAuth();
  const navigate = useNavigate();
  console.log(auth);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/auth/updateUsernameAndDisplayName", {
        id: auth.id,
        username: inputRef.current?.value || "",
        displayName: inputRef.current?.value || "",
      });

      console.log(res.data);
      navigate("/");
    } catch (e: any) {
      console.error("error");
    }
  };

  return (
    <div>
      <span>Welcome, enter your username</span>
      <input ref={inputRef} type="text" placeholder="Username" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Welcome;
