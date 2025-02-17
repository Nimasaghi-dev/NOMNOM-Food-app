import mongoose from "mongoose";
import connectDB from "./connectDB.js";

// Schemas for the database
import User from "../models/User.js";
import Item from "../models/Item.js";
import Order from "../models/Order.js";
import Restaurant from "../models/Restaurants.js";
import Review from "../models/Reviews.js";

// Data to seed
import restaurantData from "../data/restaurant.js";
import usersData from "../data/user.js";
import itemsData from "../data/item.js";
import reviewsData from "../data/review.js";
import ordersData from "../data/order.js";

// Function to seed the database
async function seedDatabase(model, data) {
  try {
    await connectDB();
    await model.deleteMany();
    await model.insertMany(data);
    mongoose.disconnect();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error:", error);
  }
}

seedDatabase(Restaurant, restaurantData);
seedDatabase(User, usersData);
seedDatabase(Item, itemsData);
seedDatabase(Review, reviewsData);
seedDatabase(Order, ordersData);

// Run the script with the following command: npm run seed
