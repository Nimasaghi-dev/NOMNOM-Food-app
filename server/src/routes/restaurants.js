import express from "express";
import { getRestaurants } from "../controllers/restaurants.js";

const router = express.Router();

// Define your routes here
router.get("/", getRestaurants);

export default router;
