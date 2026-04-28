import express from 'express';
import {config} from 'dotenv';
import { connectDB, disconnectDB } from './config/db.js';

// Import Routes
import movie_routes from './routes/movie_routes.js';

config();
connectDB();

const app = express();

// API ROUTES
app.use('/movies', movie_routes);



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`)
});

// Handle database connection errors
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('unhandledException', async (err) => {
    console.error('Uncaught Exception:', err);
    await disconnectDB();
    process.exit(1);
    });

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.error('SIGTERM received, shutting down gracefully');
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});