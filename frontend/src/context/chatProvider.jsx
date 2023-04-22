import React, { createContext, useContext, useEffect, useState } from "react";
import { redirect } from "react-router-dom";

const chatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      redirect("/");
    }
  }, []);
  return (
    <chatContext.Provider
      value={{ user, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </chatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(chatContext);
};
