import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ isRegister = false }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = isRegister ? await register(username, password) : await login(username, password);
        if (res.success) navigate('/');
        else setError(res.message);
    };

    return (
        <Box sx={{
            minHeight: 'calc(100vh - 60px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
        }}>
            <Box sx={{ width: '100%', maxWidth: 380 }}>
                {/* Brand */}
                <Box sx={{ textAlign: 'center', mb: 5 }}>
                    <Box sx={{
                        display: 'inline-flex',
                        width: 48,
                        height: 48,
                        borderRadius: '13px',
                        bgcolor: '#c9a227',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.4rem',
                        mb: 2.5,
                        boxShadow: '0 0 24px rgba(201,162,39,0.25)',
                    }}>
                        🎞
                    </Box>
                    <Typography variant="h5" sx={{ color: '#f0ead8', fontWeight: 700, letterSpacing: '-0.03em' }}>
                        {isRegister ? 'Join CineVault' : 'Welcome back'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#4a4038', mt: 0.75 }}>
                        {isRegister ? 'Create your account to start exploring.' : 'Sign in to access your collection.'}
                    </Typography>
                </Box>

                {/* Form card */}
                <Box sx={{
                    bgcolor: '#1a1816',
                    border: '1px solid rgba(201,162,39,0.12)',
                    borderRadius: '16px',
                    p: 3.5,
                }}>
                    {error && (
                        <Alert severity="error" sx={{
                            mb: 2.5,
                            bgcolor: 'rgba(224,92,92,0.08)',
                            border: '1px solid rgba(224,92,92,0.2)',
                            color: '#f0a0a0',
                            fontSize: '0.8rem',
                            '& .MuiAlert-icon': { color: '#e05c5c' },
                        }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <Typography variant="caption" sx={{ color: '#4a4038', fontWeight: 600, display: 'block', mb: 0.75, letterSpacing: '0.05em', fontSize: '0.7rem' }}>
                            USERNAME
                        </Typography>
                        <TextField
                            fullWidth variant="outlined" size="small"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            sx={{
                                mb: 2.5,
                                '& .MuiInputBase-root': { bgcolor: '#111009', fontSize: '0.875rem', color: '#f0ead8' },
                            }}
                        />

                        <Typography variant="caption" sx={{ color: '#4a4038', fontWeight: 600, display: 'block', mb: 0.75, letterSpacing: '0.05em', fontSize: '0.7rem' }}>
                            PASSWORD
                        </Typography>
                        <TextField
                            fullWidth type="password" variant="outlined" size="small"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={{
                                mb: 3,
                                '& .MuiInputBase-root': { bgcolor: '#111009', fontSize: '0.875rem', color: '#f0ead8' },
                            }}
                        />

                        <Button
                            fullWidth variant="contained" type="submit"
                            sx={{
                                bgcolor: '#c9a227',
                                color: '#0f0e0b',
                                py: 1.3,
                                fontWeight: 700,
                                fontSize: '0.875rem',
                                letterSpacing: '-0.01em',
                                boxShadow: '0 4px 16px rgba(201,162,39,0.2)',
                                '&:hover': {
                                    bgcolor: '#e2ba3a',
                                    boxShadow: '0 4px 20px rgba(201,162,39,0.35)',
                                },
                            }}
                        >
                            {isRegister ? 'Create account' : 'Sign in'}
                        </Button>
                    </form>
                </Box>

                {/* Footer link */}
                <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: '#4a4038' }}>
                    {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <Link
                        to={isRegister ? '/login' : '/register'}
                        style={{ color: '#c9a227', textDecoration: 'none', fontWeight: 600 }}
                    >
                        {isRegister ? 'Sign in' : 'Register'}
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;
