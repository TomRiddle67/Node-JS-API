import express from 'express';
import { add_to_watch_list } from '../controllers/watchlist_controller.js';

const router = express.Router();

router.post('/', add_to_watch_list);

export default router;