import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material';
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
        <AppBar
            position="sticky"
            sx={{
                top: 0,
                zIndex: 1200,
                bgcolor: 'rgba(15,14,11,0.9)',
                backdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(201,162,39,0.12)',
                boxShadow: 'none',
            }}
        >
            <Toolbar sx={{ px: { xs: 2, md: 5 }, minHeight: '60px !important' }}>
                {/* Brand */}
                <RouterLink to="/" style={{ textDecoration: 'none', flexGrow: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                    {/* Film reel icon */}
                    <Box
                        sx={{
                            width: 30,
                            height: 30,
                            borderRadius: '8px',
                            bgcolor: '#c9a227',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.9rem',
                            flexShrink: 0,
                        }}
                    >
                        🎞
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#f0ead8',
                            fontWeight: 700,
                            letterSpacing: '-0.04em',
                            fontSize: '1.05rem',
                        }}
                    >
                        CineVault
                    </Typography>
                </RouterLink>

                {/* Nav links */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {[{ label: 'Browse', to: '/' }, { label: 'Search', to: '/search' }].map(({ label, to }) => (
                        <Button
                            key={label}
                            component={RouterLink}
                            to={to}
                            sx={{
                                color: '#7a6e5e',
                                fontSize: '0.85rem',
                                px: 1.5,
                                fontWeight: 400,
                                '&:hover': { color: '#f0ead8', bgcolor: 'rgba(201,162,39,0.07)' },
                            }}
                        >
                            {label}
                        </Button>
                    ))}

                    {user?.role === 'admin' && (
                        <Button
                            component={RouterLink}
                            to="/admin"
                            sx={{
                                color: '#c9a227',
                                fontSize: '0.85rem',
                                px: 1.5,
                                '&:hover': { bgcolor: 'rgba(201,162,39,0.1)' },
                            }}
                        >
                            Dashboard
                        </Button>
                    )}

                    <Box sx={{ width: '1px', height: 18, bgcolor: 'rgba(201,162,39,0.15)', mx: 1.5 }} />

                    {user ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Chip
                                label={user.username}
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(201,162,39,0.1)',
                                    color: '#c9a227',
                                    border: '1px solid rgba(201,162,39,0.25)',
                                    fontWeight: 500,
                                    height: 26,
                                    fontSize: '0.75rem',
                                    letterSpacing: '-0.01em',
                                }}
                            />
                            <Button
                                onClick={handleLogout}
                                size="small"
                                sx={{
                                    color: '#4a4038',
                                    fontSize: '0.78rem',
                                    '&:hover': { color: '#f0ead8', bgcolor: 'rgba(201,162,39,0.06)' },
                                }}
                            >
                                Sign out
                            </Button>
                        </Box>
                    ) : (
                        <Button
                            component={RouterLink}
                            to="/login"
                            variant="outlined"
                            size="small"
                            sx={{
                                borderColor: 'rgba(201,162,39,0.3)',
                                color: '#c9a227',
                                fontSize: '0.8rem',
                                px: 2,
                                '&:hover': { borderColor: '#c9a227', bgcolor: 'rgba(201,162,39,0.08)' },
                            }}
                        >
                            Sign in
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
