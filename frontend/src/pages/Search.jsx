import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Card, CardContent, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const Search = () => {
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [movies, setMovies] = useState([]);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/movies/search?query=${query}`);
            setMovies(data);
            setSearched(true);
            setSortBy('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleSort = async (e) => {
        const sortValue = e.target.value;
        setSortBy(sortValue);
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/movies/sorted?sortBy=${sortValue}&order=desc`);
            setMovies(data);
            setSearched(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Search & Sort Movies</Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', flexGrow: 1 }}>
                    <TextField
                        label="Search by name or description"
                        variant="outlined"
                        fullWidth
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button variant="contained" type="submit">Search</Button>
                </form>

                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                        value={sortBy}
                        label="Sort By"
                        onChange={handleSort}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="rating">Rating (High to Low)</MenuItem>
                        <MenuItem value="releaseDate">Release Date (Newest)</MenuItem>
                        <MenuItem value="duration">Duration</MenuItem>
                        <MenuItem value="title">Name</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {searched && movies.length === 0 && (
                <Typography>No movies found.</Typography>
            )}

            <Grid container spacing={3}>
                {movies.map((movie) => (
                    <Grid item key={movie._id} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6">{movie.title}</Typography>
                                <Typography variant="body2" color="text.secondary">Rating: {movie.rating}</Typography>
                                <Typography variant="body2" color="text.secondary">Duration: {movie.duration}m</Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>{movie.description.substring(0, 100)}...</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Search;
