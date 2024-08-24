import { AppBar, Box, Icon, Typography } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import { UserAuth } from "@/contexts/AuthContext";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
    const { user, logout } = UserAuth();
    const isSignedIn = !!user;

    const signOut = async () => {
        try {
            await logout();
        } catch (error) {
            console.log("error")
        }
    }

    return (
        <Box position={"absolute"} top={0}>
            <AppBar position="static">
                <Box 
                    display="flex" 
                    flexDirection="row" 
                    justifyContent="space-between" 
                    alignItems="center" 
                    pb={2}
                    pt={2}
                    bgcolor={"white"}
                    sx={{
                        width: '100vw',
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        alignItems: 'center',
                        marginLeft: 2,
                    }}>
                        <DescriptionIcon sx={{fontSize: 35, color: "#4D6DFF"}}/>
                        <Typography variant="h6" color={"black"} sx={{margin: 0, fontWeight: 'bold', fontSize: 25}}>
                            Refine<span style={{ color: '#4D6DFF' }}>CV</span>
                        </Typography>
                    </Box>
                    {isSignedIn && (
                        <Button 
                            variant="contained" 
                            color="secondary"
                            onClick={signOut}
                            sx={{
                                marginRight: 2,
                                bgcolor: '#4D6DFF',
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                                <LogoutIcon/>
                        </Button>
                    )}
                </Box>
            </AppBar>
        </Box>
    )
}