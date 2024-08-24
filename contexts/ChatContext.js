'use client'
import { createContext, useState, useContext } from "react";

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const [chatHistory, setChatHistory] = useState([]);
    console.log(chatHistory)
    
    const addMessage = (message) => {
        setChatHistory([...chatHistory, message]);
    };

    return (
        <ChatContext.Provider value={{ chatHistory, addMessage }}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = () => {
    return useContext(ChatContext);
}