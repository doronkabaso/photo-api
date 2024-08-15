import { Router } from 'express';
import { getRandomPhotos } from '../controllers/photoController';

const router = Router();

// GET /api/photos/:number
router.get('/:number', getRandomPhotos);

export default router;
