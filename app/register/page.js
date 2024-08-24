'use client'
import { Box, Button, Icon, Typography } from '@mui/material';
import { UserAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import { Google } from '@mui/icons-material';
export default function Register() {
    const { user, googleSignIn } = UserAuth();
    const router = useRouter();

    useEffect(() => {
      if (user) {
        router.push('/');
      }
    }, [user, router]);
  
    const handleGoogleSignIn = async () => {
      try {
        await googleSignIn();
      } catch (error) {
        console.log("error")
      }
    };
    return (
        <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        style={{ minHeight: '100vh' }}
        gap={5}
      >
            <Typography 
                variant="h2" 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '2rem',
                    flexWrap: 'wrap',
                }}
                >
                The simplest path to <br/> 
                <Box sx={{ color: '#4D6DFF'}}>customer delight</Box>
            </Typography>
        <IconButton
            onClick={handleGoogleSignIn}
            sx={{
                border: '1px solid black',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
                transition: '0.5s', // Add this line
                '&:hover': {
                    bgcolor: 'lightgray', // Change the background color on hover
                    color: 'black', // Change the text color on hover
                },
            }}
        >
            <Google/>
            <Typography>Sign in with Google</Typography>
        </IconButton>
      </Box>
    )
}