import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton, Typography, Box, Pagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const [movies, setMovies] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({
        title: '', description: '', rating: '', releaseDate: '', duration: ''
    });

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const { user } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    };

    const fetchMovies = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/movies?pageNumber=${page}`);
            setMovies(data.movies);
            setPages(data.pages);
            setPage(data.page);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleClickOpen = () => {
        setEditMode(false);
        setFormData({ title: '', description: '', rating: '', releaseDate: '', duration: '' });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            if (editMode) {
                await axios.put(`${import.meta.env.VITE_API_URL}/api/movies/${currentId}`, formData, config);
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/api/movies`, formData, config);
            }
            fetchMovies();
            handleClose();
        } catch (error) {
            console.error(error);
            alert('Operation failed');
        }
    };

    const handleEdit = (movie) => {
        setEditMode(true);
        setCurrentId(movie._id);
        setFormData({
            title: movie.title,
            description: movie.description,
            rating: movie.rating,
            releaseDate: movie.releaseDate.split('T')[0], // format date for input
            duration: movie.duration
        });
        setOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/movies/${id}`, config);
                fetchMovies();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">Admin Dashboard - Manage Movies</Typography>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Add New Movie
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Duration (min)</TableCell>
                            <TableCell>Release Date</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movies.map((movie) => (
                            <TableRow key={movie._id}>
                                <TableCell>{movie.title}</TableCell>
                                <TableCell>{movie.rating}</TableCell>
                                <TableCell>{movie.duration}</TableCell>
                                <TableCell>{new Date(movie.releaseDate).toLocaleDateString()}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => handleEdit(movie)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(movie._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination count={pages} page={page} onChange={handlePageChange} color="primary" />
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editMode ? 'Edit Movie' : 'Add New Movie'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Title"
                        fullWidth
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="rating"
                        label="Rating (0-10)"
                        type="number"
                        fullWidth
                        value={formData.rating}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="releaseDate"
                        label="Release Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={formData.releaseDate}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        label="Duration (minutes)"
                        type="number"
                        fullWidth
                        value={formData.duration}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        {editMode ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default AdminDashboard;
