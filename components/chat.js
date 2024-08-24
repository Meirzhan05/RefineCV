'use client'
import { Box, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { keyframes, css } from "@mui/material";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeInAnimation = css`
    animation: ${fadeIn} 0.3s ease-in;

`;

export default function Chat({messages}) {
    const messagesEndRef = useRef(null);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);
    return (
        <Box sx={{
            width: "100%",
            haeight: '100%',
            display: 'flex',
            flexDirection: "column",
            overflowY: 'scroll',
            overflowX: 'hidden', 
            mb: 5,

        }}>
            {messages.map((message, index) => {
                if (message.user === "system") {
                    return null;  // Skip rendering for this message
                }
                
                return (  
                    <Box key={index} sx={{
                        width: '94%',
                        display: 'flex',
                        justifyContent: message.user === "bot" ? "flex-start" : "flex-end",
                        padding: 2,
                        margin: 2,
                    }}>
                        {message.user === "bot" ? 
                            <Box sx={{
                                // ...fadeInAnimation, 
                                backgroundColor: "#4D6DFF",
                                color: "white",
                                padding: 2,
                                borderRadius: 3,
                                overflowWrap: 'break-word', 
                                maxWidth: '45%',
                                lineHeight: '1.7',
                                animation: `${fadeIn} 0.3s ease-in`,
                            }}>
                                {message.message}
                            </Box> :
                            <Box variant="h6" sx={{
                                backgroundColor: "#003366",
                                color: "white",
                                padding: 2,
                                borderRadius: 3,
                                display: 'flex',
                                justifyContent: 'flex-end',
                                overflowWrap: 'break-word', 
                                maxWidth: '45%',
                                lineHeight: '1.7',
                                animation: `${fadeIn} 0.3s ease-in`,

                            }}>{message.message}</Box>
                        }
                        <div ref={messagesEndRef} />
                    </Box>
                )
            })}
        </Box>
    )
}