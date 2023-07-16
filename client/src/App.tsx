import React, { ReactNode } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Routes, Route, NavLink, useLocation, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import AuthProvider from "./context/AuthProvider";
import Home from "./pages/Home";
import Protected from "./utils/Protected";
import User from "./components/User";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./pages/Chat";
import styled from "styled-components";

const SidebarRender = () => {
  const location = useLocation();

  return location.pathname === "/login" || location.pathname === "/register" ? <Outlet /> : <Sidebar />;
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  max-height: 100vh;
`;

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

function App() {
  return (
    <Layout>
      <AuthProvider>
        <BrowserRouter>
          <SidebarRender />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/:id" element={<Chat />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Layout>
  );
}

export default App;
