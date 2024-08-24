'use client'
import { useEffect } from 'react';
import { Box } from "@mui/material";
import { UserAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import ChatBox from '@/components/chatBox';

export default function Home() {
  const router = useRouter();
  const {user} = UserAuth();

  useEffect(() => {
    if (!user) {
      router.push('/register');
    }
  }, [user, router]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ChatBox />
    </Box>
  );
}