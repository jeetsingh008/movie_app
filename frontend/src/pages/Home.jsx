import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Pagination, Box, CircularProgress, Container, TextField, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const [keyword, setKeyword] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                let url = `${import.meta.env.VITE_API_URL}/api/movies?pageNumber=${page}`;

                if (keyword) {
                    url = `${import.meta.env.VITE_API_URL}/api/movies/search?query=${keyword}`;
                } else if (sortBy) {
                    url = `${import.meta.env.VITE_API_URL}/api/movies/sorted?sortBy=${sortBy}&order=${sortOrder}`;
                }

                const { data } = await axios.get(url);

                if (Array.isArray(data)) {
                    setMovies(data);
                    setPages(1);
                } else {
                    setMovies(data.movies);
                    setPages(data.pages);
                    setPage(data.page);
                }

            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };

        const timeoutId = setTimeout(() => {
            fetchMovies();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [page, keyword, sortBy, sortOrder]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 4, pr: { md: '340px' } }}>
            <Grid container spacing={4}>
                {/* Main Content */}
                <Grid item xs={12}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
                        Top Movies
                    </Typography>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>
                    ) : (
                        <>
                            <Grid container spacing={3}>
                                {movies.map((movie) => (
                                    <Grid item key={movie._id} xs={12} sm={6} md={4}>
                                        <Card sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            bgcolor: 'background.paper',
                                            borderRadius: 2,
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                                            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
                                            }
                                        }}>
                                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                                <Typography gutterBottom variant="h5" component="div" noWrap title={movie.title} sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
                                                    {movie.title}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <Typography variant="body2" sx={{
                                                        bgcolor: 'rgba(79, 195, 247, 0.15)',
                                                        color: '#4FC3F7',
                                                        px: 1,
                                                        py: 0.5,
                                                        borderRadius: 1,
                                                        fontWeight: 'bold'
                                                    }}>
                                                        ★ {movie.rating}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                                                        {new Date(movie.releaseDate).getFullYear()} • {movie.duration} min
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary" sx={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    lineHeight: 1.6
                                                }}>
                                                    {movie.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                                <Pagination count={pages} page={page} onChange={handlePageChange} color="primary" />
                            </Box>
                        </>
                    )}
                </Grid>

                {/* Sidebar - Search & Sort */}
                <Box
                    sx={{
                        width: '300px',
                        position: 'fixed',
                        top: '80px',
                        right: '24px',
                        zIndex: 1000,
                        maxHeight: 'calc(100vh - 100px)',
                        overflowY: 'auto'
                    }}
                >
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Filters
                        </Typography>

                        {/* Search Bar */}
                        <TextField
                            fullWidth
                            label="Search Movies..."
                            variant="outlined"
                            margin="normal"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            sx={{ mb: 3 }}
                        />

                        {/* Sort Options */}
                        <Typography variant="subtitle1" gutterBottom>
                            Sort By
                        </Typography>
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Criteria</InputLabel>
                            <Select
                                value={sortBy}
                                label="Criteria"
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <MenuItem value="">Default</MenuItem>
                                <MenuItem value="title">Title</MenuItem>
                                <MenuItem value="rating">Rating</MenuItem>
                                <MenuItem value="releaseDate">Release Date</MenuItem>
                                <MenuItem value="duration">Duration</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="dense" sx={{ mt: 2 }}>
                            <InputLabel>Order</InputLabel>
                            <Select
                                value={sortOrder}
                                label="Order"
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <MenuItem value="asc">Ascending</MenuItem>
                                <MenuItem value="desc">Descending</MenuItem>
                            </Select>
                        </FormControl>
                    </Paper>
                </Box>
            </Grid>
        </Container>
    );
};

export default Home;
