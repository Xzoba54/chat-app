import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";

export type Auth = {
  username: string;
  id: number;
};

type AuthContextType = {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
};

export const AuthContext = createContext<AuthContextType>({
  auth: { username: "", id: -1 },
  setAuth: () => {},
});

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<Auth>({
    username: "",
    id: -1,
  });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
