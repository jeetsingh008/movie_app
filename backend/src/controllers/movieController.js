const Movie = require('../models/Movie');
const { addMovieToQueue } = require('../queue/movieQueue');

const getMovies = async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    try {
        const count = await Movie.countDocuments({});
        const movies = await Movie.find({})
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ movies, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const searchMovies = async (req, res) => {
    const keyword = req.query.query
        ? {
            $or: [
                { title: { $regex: req.query.query, $options: 'i' } },
                { description: { $regex: req.query.query, $options: 'i' } },
            ],
        }
        : {};

    try {
        const movies = await Movie.find({ ...keyword });
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getSortedMovies = async (req, res) => {
    const sortBy = req.query.sortBy || 'title';
    const order = req.query.order === 'desc' ? -1 : 1;

    try {
        const movies = await Movie.find({}).sort({ [sortBy]: order });
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const addMovie = async (req, res) => {
    const { title, description, rating, releaseDate, duration } = req.body;

    try {
        await addMovieToQueue(req.body);

        res.status(202).json({ message: 'Movie addition queued successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to queue movie' });
    }
};

const updateMovie = async (req, res) => {
    const { title, description, rating, releaseDate, duration } = req.body;

    try {
        const movie = await Movie.findById(req.params.id);

        if (movie) {
            movie.title = title || movie.title;
            movie.description = description || movie.description;
            movie.rating = rating || movie.rating;
            movie.releaseDate = releaseDate || movie.releaseDate;
            movie.duration = duration || movie.duration;

            const updatedMovie = await movie.save();
            res.json(updatedMovie);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (movie) {
            await movie.deleteOne();
            res.json({ message: 'Movie removed' });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getMovies,
    searchMovies,
    getSortedMovies,
    addMovie,
    updateMovie,
    deleteMovie,
};
