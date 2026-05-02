import { prisma } from "../config/db.js";

const add_to_watch_list = async (req, res) => {
    try {
        const {movie_id, status, rating, notes} = req.body; 
        const user_id = req.user.id; 

        const movie = await prisma.movie.findUnique({
            where: {id: movie_id},
        });

        if (!movie) {
            return res.status(404).json({error: "Movie not found"});
        }

        const existing_in_watch_list = await prisma.watchlistItem.findUnique({
            where: {
                userId_movieId: {
                    userId: user_id,
                    movieId: movie_id,
                },
            },
        });

        if (existing_in_watch_list) {
            return res.status(400).json({error: "Movie already in the watchlist"});
        }

        const watchlistItem = await prisma.watchlistItem.create({
            data: {
                userId: user_id, // ← fix this
                movieId: movie_id,
                status: status || "PLANNED",
                rating,
                notes,
            },
        });

        res.status(201).json({
            status: "Success",
            data: { watchlistItem },
        });

    } catch (error) {
        console.error('Watchlist error:', error.message);
        res.status(500).json({error: error.message});
    }
};

export { add_to_watch_list };
