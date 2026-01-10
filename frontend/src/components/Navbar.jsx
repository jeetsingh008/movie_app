import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="sticky" sx={{ top: 0, zIndex: 1200, bgcolor: '#132F4C', backgroundImage: 'none', boxShadow: 3 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
                        MERN Movie App
                    </RouterLink>
                </Typography>
                <Box>
                    <Button color="inherit" component={RouterLink} to="/" sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                        Home
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/search" sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                        Search
                    </Button>


                    {user && user.role === 'admin' && (
                        <Button color="inherit" component={RouterLink} to="/admin" sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                            Admin Dashboard
                        </Button>
                    )}

                    {user ? (
                        <>
                            <Typography variant="body1" component="span" sx={{ mx: 2, color: 'primary.main', fontWeight: 'bold' }}>
                                Hello, {user.username}
                            </Typography>
                            <Button color="inherit" onClick={handleLogout} variant="outlined" sx={{ ml: 1, borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button color="inherit" component={RouterLink} to="/login" sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
