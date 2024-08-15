import { Request, Response } from 'express';
import Order from '../models/orderModel';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    return res.status(201).json(savedOrder);
  } catch (error: any) {
    console.error('Error creating order:', error.message);
    return res.status(500).json({ error: 'Failed to create order' });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ user: userId });
    return res.json(orders);
  } catch (error: any) {
    console.error('Error fetching orders:', error.message);
    return res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
