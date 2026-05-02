import {z} from 'zod';

export const watchlistSchema = z.object({
    movie_id: z.string().uuid('invalid movie ID'),
    status: z.enum(['PLANNED', 'WATCHING', 'COMPLETED', 'DROPPED' ]).optional(),
    rating: z.number().int().min(1).max(10).optional(),
    notes: z.string().optional(),

});