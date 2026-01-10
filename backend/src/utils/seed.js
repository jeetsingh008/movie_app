const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../../.env') });

const connectDB = require('../config/db');
const { addMovieToQueue, movieQueue, worker } = require('../queue/movieQueue');
const movies = require('./top10.json');

// Connect to Database
connectDB();

const seedMovies = async () => {
    console.log('Seeding movies to queue...');

    for (const movie of movies) {
        await addMovieToQueue(movie);
        console.log(`Queued: ${movie.title}`);
    }

    console.log('Seeding complete. Waiting for queue to process...');

    setTimeout(async () => {
        console.log('Exiting seed script.');
        process.exit();
    }, 5000);
};

seedMovies();
