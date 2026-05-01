import {config} from 'dotenv';
config();
import express from 'express';
import { connectDB, disconnectDB } from './config/db.js';

// Import Routes
import movie_routes from './routes/movie_routes.js';
import authRoutes from './routes/authRoutes.js';


connectDB();

const app = express();

// middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));


// API ROUTES
app.use('/movies', movie_routes);
app.use('/auth', authRoutes);



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