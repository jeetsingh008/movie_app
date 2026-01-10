import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box, Alert } from '@mui/material';
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

        let res;
        if (isRegister) {
            res = await register(username, password);
        } else {
            res = await login(username, password);
        }

        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
                <Typography variant="h5" gutterBottom component="div" sx={{ textAlign: 'center' }}>
                    {isRegister ? 'Register' : 'Login'}
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: 2, py: 1.5 }}
                    >
                        {isRegister ? 'Register' : 'Login'}
                    </Button>
                </form>

                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body2">
                        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <Link to={isRegister ? '/login' : '/register'} style={{ textDecoration: 'none' }}>
                            {isRegister ? 'Login here' : 'Register here'}
                        </Link>
                    </Typography>

                    {isRegister && (
                        <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                            Note: First user will not be admin. Admin must be created manually in DB or strict flow.
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;
