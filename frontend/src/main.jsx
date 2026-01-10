import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#4FC3F7', // Lighter vivid blue for dark mode
        },
        background: {
            default: '#0A1929', // Deep dark blue-grey
            paper: '#132F4C',   // Slightly lighter for cards
        },
        text: {
            primary: '#E0FAFF',
            secondary: '#B0BEC5',
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
