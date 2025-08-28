import { Router } from 'express';
import { validateImageQuery } from '../middleware/validateQuery';
import { cacheMiddleware } from '../middleware/cache';
import { getResizedImage } from '../controllers/images.controller';

const router = Router();

/**
  GET /api/images?filename=fjord.jpg&width=200&height=200
  - validates query
  - checks cache
  - if not in cache, resizes and stores
  - returns the image file
 */
router.get('/', validateImageQuery, cacheMiddleware, getResizedImage);

export default router;
