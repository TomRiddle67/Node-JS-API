import express from 'express';
import movie_routes from './routes/movie_routes.js';

const app = express();

// API ROUTES
app.use('/movies', movie_routes);



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`)
});