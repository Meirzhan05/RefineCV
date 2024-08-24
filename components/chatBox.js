'use client'
import { Box } from "@mui/material";
import Input from "./input";
import Chat from '@/components/chat';
import { useState, useEffect } from "react";
export default function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.user === 'user') {
            recieveMessage(lastMessage.message, messages);
        }
    }, [messages]);

    async function recieveMessage(message, chat_history) {
        const formData = new FormData();
        formData.append('query', message);
        chat_history.forEach((item, index) => {
            formData.append(`history[${index}]`, JSON.stringify(item));
        });

        if (selectedFiles && selectedFiles.length > 0) {
            chat_history.push({message: selectedFiles[0].text, user: 'system'});
            setSelectedFiles([]);
            formData.append('docs', JSON.stringify(selectedFiles));
        }
        fetch('/api/chat', {
            method: 'POST',
            body: formData,
        }).then(async (res) => {  

            const r = await res.json()
            setMessages((prevMessages) => [...prevMessages, {
                message: r.content,
                user: 'bot',
            }])
        } ).catch((err) => console.log(err))


    }

    const sendMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, {
            message: message,
            user: 'user'
        }])
    }


    return (
        <Box 
        sx={{
            borderRadius: 2,
            width: '70vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
        }}>
            <Chat messages={messages}/>
            <Input sendMessage={sendMessage} setSelectedFiles={setSelectedFiles} selectedFiles={selectedFiles}/>
        </Box>
    )
}