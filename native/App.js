import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Route, Routes, Navigate, NativeRouter } from "react-router-native";
import Layout from "./components/layout/layout.jsx";
import Home from "./routes/home/home";
import Profil from "./routes/profil/profil";
import Menu from "./routes/menu/menu";
import Chat from "./routes/chat/chat";
import Page from "./routes/page/page";

export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/Home" />} />
          <Route index path="/Home" element={<Home />} />
          <Route path="/Profil" element={<Profil />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path=":targetPage" element={<Page />} />
          <Route path="/Chat" element={<Chat />} />
        </Route>
      </Routes>
    </NativeRouter>
  );
}
