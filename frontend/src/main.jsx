import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#c9a227',
            light: '#e2ba3a',
            dark: '#a8841a',
            contrastText: '#0f0e0b',
        },
        secondary: {
            main: '#c9a227',
        },
        background: {
            default: '#0f0e0b',
            paper: '#1a1816',
        },
        text: {
            primary: '#f0ead8',
            secondary: '#7a6e5e',
        },
        divider: 'rgba(201,162,39,0.1)',
        error: {
            main: '#e05c5c',
        },
    },
    typography: {
        fontFamily: "'Inter', system-ui, sans-serif",
        h4: { fontWeight: 700, letterSpacing: '-0.03em' },
        h5: { fontWeight: 700, letterSpacing: '-0.02em' },
        h6: { fontWeight: 600, letterSpacing: '-0.01em' },
    },
    shape: { borderRadius: 10 },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#2a2620 transparent',
                    background: '#0f0e0b',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    border: '1px solid rgba(201,162,39,0.09)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    border: '1px solid rgba(201,162,39,0.09)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(201,162,39,0.15)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(201,162,39,0.35)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#c9a227',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: { backgroundImage: 'none' },
            },
        },
        MuiSelect: {
            styleOverrides: {
                icon: { color: '#7a6e5e' },
            },
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <App />
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
