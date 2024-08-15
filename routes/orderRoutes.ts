import { Router } from 'express';
import { createOrder, getUserOrders } from '../controllers/orderController';

const router = Router();

// POST /api/orders
router.post('/', createOrder);

// GET /api/orders/:userId
router.get('/:userId', getUserOrders);

export default router;
