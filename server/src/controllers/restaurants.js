import prisma from "../db/prisma.js";
import { logError } from "../util/logging.js";

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    // Return the same {success, result} shape used by every other endpoint,
    // exposing `_id` so the frontend can key restaurants the same way as before.
    res.status(200).json({
      success: true,
      result: restaurants.map((r) => ({ ...r, _id: r.id })),
    });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, msg: "Unable to get restaurants" });
  }
};
