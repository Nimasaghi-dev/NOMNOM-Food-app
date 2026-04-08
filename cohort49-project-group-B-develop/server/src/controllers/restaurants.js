import Restaurant from "../models/Restaurants.js";
import { logError } from "../util/logging.js";

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    // Return the same {success, result} shape used by every other endpoint
    // so the frontend can handle all responses the same way
    res.status(200).json({ success: true, result: restaurants });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, msg: "Unable to get restaurants" });
  }
};
