import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Protected = () => {
  const { auth } = useAuth();

  return auth.id !== 1 && auth.username !== "" ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;
