'use client'
import { Inter } from "next/font/google";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { ChatContextProvider } from "@/contexts/ChatContext";

const inter = Inter({ subsets: ['latin'], display: 'swap', adjustFontFallback: false})
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <ChatContextProvider>
            {children}
          </ChatContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
