import React, { useEffect, useState } from 'react';
import {
    Grid, Card, CardContent, Typography, Box,
    CircularProgress, TextField, FormControl,
    Select, MenuItem, Pagination, Chip, Divider,
} from '@mui/material';
import axios from 'axios';

/* ── Icons ── */
const GoldStar = () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="#c9a227">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);
const Dot = () => <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: '#2e2820', flexShrink: 0 }} />;

/* ── Label component ── */
const FieldLabel = ({ children }) => (
    <Typography variant="caption" sx={{
        color: '#4a4038',
        fontWeight: 700,
        display: 'block',
        mb: 0.75,
        letterSpacing: '0.08em',
        fontSize: '0.65rem',
    }}>
        {children}
    </Typography>
);

/* ── Movie Card ── */
const MovieCard = ({ movie }) => (
    <Card sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#1a1816',
        borderRadius: '12px',
        border: '1px solid rgba(201,162,39,0.09)',
        boxShadow: 'none',
        transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
        '&:hover': {
            borderColor: 'rgba(201,162,39,0.35)',
            transform: 'translateY(-3px)',
            boxShadow: '0 14px 36px rgba(0,0,0,0.55)',
        },
    }}>
        <CardContent sx={{ flexGrow: 1, p: '20px 24px' }}>
            {movie.genre && (
                <Typography sx={{
                    color: '#c9a227',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    mb: 1.25,
                    display: 'block',
                    opacity: 0.65,
                }}>
                    {movie.genre}
                </Typography>
            )}
            <Typography noWrap title={movie.title} sx={{
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#f0ead8',
                mb: 1.25,
                fontSize: '0.97rem',
                lineHeight: 1.4,
            }}>
                {movie.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.75 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <GoldStar />
                    <Typography sx={{ color: '#c9a227', fontWeight: 600, fontSize: '0.76rem' }}>
                        {movie.rating}
                    </Typography>
                </Box>
                <Dot />
                <Typography sx={{ color: '#5a5048', fontSize: '0.72rem' }}>{new Date(movie.releaseDate).getFullYear()}</Typography>
                <Dot />
                <Typography sx={{ color: '#5a5048', fontSize: '0.72rem' }}>{movie.duration} min</Typography>
            </Box>
            <Typography sx={{
                color: '#4a4038',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.7,
                fontSize: '0.8rem',
            }}>
                {movie.description}
            </Typography>
        </CardContent>
    </Card>
);

/* ── Left Sidebar ── */
const FilterPanel = ({ keyword, setKeyword, sortBy, setSortBy, sortOrder, setSortOrder, total }) => (
    <Box sx={{
        width: 240,
        flexShrink: 0,
        position: 'sticky',
        top: 76,
        alignSelf: 'flex-start',
        height: 'fit-content',
    }}>
        {/* Panel header */}
        <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ color: '#f0ead8', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '-0.01em' }}>
                    Filters
                </Typography>
                {total > 0 && (
                    <Chip label={`${total} titles`} size="small" sx={{
                        bgcolor: 'rgba(201,162,39,0.08)',
                        color: '#c9a227',
                        border: '1px solid rgba(201,162,39,0.18)',
                        height: 22, fontSize: '0.65rem', fontWeight: 700,
                    }} />
                )}
            </Box>
        </Box>

        {/* Search */}
        <Box sx={{ mb: 3 }}>
            <FieldLabel>SEARCH</FieldLabel>
            <TextField
                fullWidth placeholder="Title..." variant="outlined" size="small"
                value={keyword} onChange={(e) => setKeyword(e.target.value)}
                sx={{
                    '& .MuiInputBase-root': { bgcolor: '#111009', fontSize: '0.85rem', color: '#f0ead8', borderRadius: '8px' },
                    '& .MuiInputBase-input::placeholder': { color: '#3a3028', opacity: 1 },
                }}
            />
        </Box>

        <Divider sx={{ borderColor: 'rgba(201,162,39,0.08)', mb: 3 }} />

        {/* Sort by */}
        <Box sx={{ mb: 2 }}>
            <FieldLabel>SORT BY</FieldLabel>
            <FormControl fullWidth size="small">
                <Select value={sortBy} displayEmpty onChange={(e) => setSortBy(e.target.value)}
                    sx={{ bgcolor: '#111009', color: '#f0ead8', fontSize: '0.85rem', borderRadius: '8px' }}>
                    <MenuItem value="">Default</MenuItem>
                    <MenuItem value="title">Title</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                    <MenuItem value="releaseDate">Release Date</MenuItem>
                    <MenuItem value="duration">Duration</MenuItem>
                </Select>
            </FormControl>
        </Box>

        {/* Order */}
        <Box>
            <FieldLabel>ORDER</FieldLabel>
            <FormControl fullWidth size="small">
                <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}
                    sx={{ bgcolor: '#111009', color: '#f0ead8', fontSize: '0.85rem', borderRadius: '8px' }}>
                    <MenuItem value="asc">Ascending ↑</MenuItem>
                    <MenuItem value="desc">Descending ↓</MenuItem>
                </Select>
            </FormControl>
        </Box>
    </Box>
);

/* ── Main Page ── */
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
                if (keyword) url = `${import.meta.env.VITE_API_URL}/api/movies/search?query=${keyword}`;
                else if (sortBy) url = `${import.meta.env.VITE_API_URL}/api/movies/sorted?sortBy=${sortBy}&order=${sortOrder}`;
                const { data } = await axios.get(url);
                if (Array.isArray(data)) { setMovies(data); setPages(1); }
                else { setMovies(data.movies); setPages(data.pages); setPage(data.page); }
            } catch (err) { console.error(err); }
            setLoading(false);
        };
        const t = setTimeout(fetchMovies, 500);
        return () => clearTimeout(t);
    }, [page, keyword, sortBy, sortOrder]);

    return (
        /* Full-page wrapper */
        <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, md: 5 }, pt: 5, pb: 10 }}>

            {/* ── Page header ── */}
            <Box sx={{ mb: 6, borderBottom: '1px solid rgba(201,162,39,0.08)', pb: 4 }}>
                <Typography sx={{
                    fontSize: { xs: '1.75rem', md: '2rem' },
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    color: '#f0ead8',
                    mb: 0.5,
                }}>
                    Browse Films
                </Typography>
                <Typography sx={{ color: '#4a4038', fontSize: '0.85rem' }}>
                    Explore, sort, and discover the collection.
                </Typography>
            </Box>

            {/* ── Two-column layout ── */}
            <Box sx={{ display: 'flex', gap: { xs: 0, md: 6 }, alignItems: 'flex-start' }}>

                {/* Left: filter panel — hidden on mobile */}
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <FilterPanel
                        keyword={keyword} setKeyword={setKeyword}
                        sortBy={sortBy} setSortBy={setSortBy}
                        sortOrder={sortOrder} setSortOrder={setSortOrder}
                        total={movies.length}
                    />
                </Box>

                {/* Vertical divider */}
                <Box sx={{ display: { xs: 'none', md: 'block' }, width: '1px', bgcolor: 'rgba(201,162,39,0.08)', alignSelf: 'stretch', flexShrink: 0 }} />

                {/* Right: main content */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '45vh' }}>
                            <CircularProgress size={26} sx={{ color: '#c9a227' }} />
                        </Box>
                    ) : movies.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 14 }}>
                            <Typography sx={{ color: '#3a3028', fontSize: '0.875rem' }}>Nothing found in the vault.</Typography>
                        </Box>
                    ) : (
                        <>
                            <Grid container spacing={2.5}>
                                {movies.map((movie) => (
                                    <Grid item key={movie._id} xs={12} sm={6} lg={4}>
                                        <MovieCard movie={movie} />
                                    </Grid>
                                ))}
                            </Grid>

                            {pages > 1 && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                                    <Pagination
                                        count={pages} page={page}
                                        onChange={(_, v) => setPage(v)}
                                        variant="outlined" shape="rounded"
                                        sx={{
                                            '& .MuiPaginationItem-root': { color: '#7a6e5e', borderColor: 'rgba(201,162,39,0.12)' },
                                            '& .Mui-selected': {
                                                bgcolor: 'rgba(201,162,39,0.1) !important',
                                                color: '#c9a227',
                                                borderColor: 'rgba(201,162,39,0.4)',
                                            },
                                        }}
                                    />
                                </Box>
                            )}
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
