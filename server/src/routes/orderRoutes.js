import express from "express";
import prisma from "../db/prisma.js";

const router = express.Router();

const withId = (order) => ({ ...order, _id: order.id });

// Getting all orders
router.get("/", async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders.map(withId));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { restaurant_id, total_amount, items, paymentMethod, address } =
      req.body;

    const newOrder = await prisma.order.create({
      data: {
        // Only link a restaurant if one was provided (FK is optional)
        restaurantId: restaurant_id || null,
        total_amount,
        items: items || [],
        ...(paymentMethod ? { paymentMethod } : {}),
        address,
        // status defaults to "pending" as defined in the Prisma schema
      },
    });

    // useFetch on the client checks for success: true before calling onSuccess
    res.status(201).json({ success: true, result: withId(newOrder) });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
});

// Update an order
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      restaurant_id,
      total_amount,
      status,
      category,
      items,
      address,
      paymentMethod,
    } = req.body;

    // Whitelist updatable fields so callers can't write arbitrary columns
    const data = {};
    if (restaurant_id !== undefined) data.restaurantId = restaurant_id || null;
    if (total_amount !== undefined) data.total_amount = total_amount;
    if (status !== undefined) data.status = status;
    if (category !== undefined) data.category = category;
    if (items !== undefined) data.items = items;
    if (address !== undefined) data.address = address;
    if (paymentMethod !== undefined) data.paymentMethod = paymentMethod;

    const updateOrder = await prisma.order.update({ where: { id }, data });
    res.json(withId(updateOrder));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an order
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.order.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
