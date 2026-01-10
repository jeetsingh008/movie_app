const { Queue, Worker } = require('bullmq');
const Movie = require('../models/Movie');
const IORedis = require('ioredis');

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: null,
    retryStrategy: function (times) {
        if (times > 3) {
            console.warn('Redis connection failed permanently. Queue disabled.');
            return null;
        }
        return Math.min(times * 50, 2000);
    }
});

const movieQueue = new Queue('movie-queue', { connection });

const worker = new Worker('movie-queue', async (job) => {
    console.log(`Processing job ${job.id} for movie: ${job.data.title}`);

    try {
        const { title, description, rating, releaseDate, duration, originalId } = job.data;

        const existingMovie = await Movie.findOne({ title });

        if (!existingMovie) {
            const movie = new Movie({
                title,
                description,
                rating,
                releaseDate,
                duration,
                originalId
            });
            await movie.save();
            console.log(`Movie added: ${title}`);
        } else {
            console.log(`Movie already exists: ${title}`);
        }

    } catch (error) {
        console.error(`Failed to process job ${job.id}:`, error);
        throw error;
    }

}, { connection });

worker.on('completed', job => {
    console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
});

const addMovieToQueue = async (movieData) => {
    await movieQueue.add('addMovie', movieData);
};

module.exports = { addMovieToQueue, movieQueue, worker };
