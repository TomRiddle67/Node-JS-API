import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config';

const adapter = new PrismaPg({ 
    connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

const creator_id = process.env.CREATOR_ID;

const movies = [
    {
        title: "The Dark Knight",
        overview: "Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos.",
        releaseYear: 2008,
        genres: "Action, Crime, Drama",
        runtime: "152 min",
        posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        createdBy: creator_id,
    },
    {
        title: "Inception",
        overview: "A thief who steals corporate secrets through dream-sharing technology.",
        releaseYear: 2010,
        genres: "Action, Sci-Fi, Thriller",
        runtime: "148 min",
        posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        createdBy: creator_id,
    },
    {
        title: "Interstellar",
        overview: "A team of explorers travel through a wormhole in space to ensure humanity's survival.",
        releaseYear: 2014,
        genres: "Adventure, Drama, Sci-Fi",
        runtime: "169 min",
        posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        createdBy: creator_id,
    },
    {
        title: "The Shawshank Redemption",
        overview: "Two imprisoned men bond over years, finding solace and redemption.",
        releaseYear: 1994,
        genres: "Drama",
        runtime: "142 min",
        posterUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        createdBy: creator_id,
    },
    {
        title: "Pulp Fiction",
        overview: "The lives of two mob hitmen, a boxer, and a pair of bandits intertwine.",
        releaseYear: 1994,
        genres: "Crime, Drama",
        runtime: "154 min",
        posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        createdBy: creator_id,
    },
];

const seed = async () => {
    try {
        await prisma.movie.createMany({ data: movies });
        console.log('Movies seeded successfully');
    } catch (error) {
        console.error('Seed error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
};

seed();