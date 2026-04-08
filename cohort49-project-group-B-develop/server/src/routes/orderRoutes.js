import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

//Getting all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { restaurant_id, total_amount, items, paymentMethod, address } =
      req.body;

    const newOrder = new Order({
      restaurant_id,
      total_amount,
      items: items || [],
      paymentMethod,
      address,
      // status defaults to "pending" as defined in the Order model
    });

    await newOrder.save();

    // useFetch on the client checks for success: true before calling onSuccess
    res.status(201).json({ success: true, result: newOrder });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
});

//Update an order
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete an order
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
