import express from 'express';
import { add_to_watch_list } from '../controllers/watchlist_controller.js';
import { authMiddleware } from '../middleware/auth_middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', add_to_watch_list);

export default router;