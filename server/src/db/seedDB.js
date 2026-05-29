import mongoose from "mongoose";
import connectDB from "./connectDB.js";

import User from "../models/User.js";
import Item from "../models/Item.js";
import Order from "../models/Order.js";
import Restaurant from "../models/Restaurants.js";
import Review from "../models/Reviews.js";

// Run with: npm run seed (from the server folder)
const seed = async () => {
  try {
    await connectDB();

    // Clear all collections before re-seeding so we start fresh every time
    await Promise.all([
      User.deleteMany(),
      Item.deleteMany(),
      Order.deleteMany(),
      Restaurant.deleteMany(),
      Review.deleteMany(),
    ]);

    // Step 1: create the restaurant first so we can use its real _id for items and orders
    const restaurant = await Restaurant.create({
      name: "La Bella Pizza",
      address: "123 Main Street, Amsterdam, Netherlands",
      phone: "+31 20 123 4567",
      email: "labella.pizza@example.com",
      cuisine: "Italian",
    });

    const restaurantId = restaurant._id;

    // Step 2: seed menu items, each linked to the restaurant created above
    await Item.insertMany([
      { Restaurants_id: restaurantId, food_name: "Fried Calamari", description: "Crispy breaded calamari served with marinara sauce", price: 9.99, category: "starter", imgId: 1 },
      { Restaurants_id: restaurantId, food_name: "Roasted Vegetables", description: "A selection of seasonal vegetables, roasted to perfection", price: 7.99, category: "starter", imgId: 2 },
      { Restaurants_id: restaurantId, food_name: "Caprese Salad", description: "Fresh mozzarella, ripe tomatoes, and basil with a balsamic glaze", price: 8.50, category: "starter", imgId: 3 },
      { Restaurants_id: restaurantId, food_name: "Garlic Breadsticks", description: "Breadsticks served with marinara dipping sauce", price: 5.99, category: "starter", imgId: 4 },
      { Restaurants_id: restaurantId, food_name: "Buffalo Wings", description: "Spicy chicken wings with a side of blue cheese dip", price: 10.99, category: "starter", imgId: 5 },
      { Restaurants_id: restaurantId, food_name: "Mixed Salad", description: "Fresh mixed greens with Italian vinaigrette", price: 6.50, category: "starter", imgId: 6 },
      { Restaurants_id: restaurantId, food_name: "Bruschetta", description: "Mini bruschettas with tomatoes, garlic, and basil", price: 7.25, category: "starter", imgId: 7 },
      { Restaurants_id: restaurantId, food_name: "Mozzarella Sticks", description: "Crispy mozzarella sticks served with marinara sauce", price: 8.00, category: "starter", imgId: 8 },
      { Restaurants_id: restaurantId, food_name: "Antipasto Platter", description: "Italian cured meats, olives, and cheeses", price: 12.00, category: "starter", imgId: 9 },
      { Restaurants_id: restaurantId, food_name: "Focaccia Bread", description: "Homemade focaccia bread with rosemary and olive oil", price: 4.99, category: "starter", imgId: 10 },
      { Restaurants_id: restaurantId, food_name: "Margherita Pizza", description: "Classic margherita pizza with fresh mozzarella and basil.", price: 9.99, category: "main_dish", imgId: 11 },
      { Restaurants_id: restaurantId, food_name: "Pepperoni Pizza", description: "Pepperoni pizza with a crispy crust and a rich tomato sauce.", price: 12.99, category: "main_dish", imgId: 12 },
      { Restaurants_id: restaurantId, food_name: "Vegetarian Pizza", description: "Vegetarian pizza with a variety of fresh vegetables.", price: 11.49, category: "main_dish", imgId: 13 },
      { Restaurants_id: restaurantId, food_name: "BBQ Chicken Pizza", description: "BBQ chicken pizza with smoky barbecue sauce and tender chicken.", price: 13.49, category: "main_dish", imgId: 14 },
      { Restaurants_id: restaurantId, food_name: "Hawaiian Pizza", description: "Hawaiian pizza with pineapple and ham on a golden crust.", price: 12.49, category: "main_dish", imgId: 15 },
      { Restaurants_id: restaurantId, food_name: "Mushroom Pizza", description: "Mushroom pizza with garlic and a blend of rich cheeses.", price: 11.99, category: "main_dish", imgId: 16 },
      { Restaurants_id: restaurantId, food_name: "Spicy Sausage Pizza", description: "Spicy pizza with Italian sausage, jalapenos, and mozzarella.", price: 13.99, category: "main_dish", imgId: 17 },
      { Restaurants_id: restaurantId, food_name: "Four Cheese Pizza", description: "Four-cheese pizza with mozzarella, cheddar, parmesan, and blue cheese.", price: 14.49, category: "main_dish", imgId: 18 },
      { Restaurants_id: restaurantId, food_name: "Meat Lover's Pizza", description: "Meat lover's pizza with pepperoni, sausage, bacon, and ham.", price: 15.99, category: "main_dish", imgId: 19 },
      { Restaurants_id: restaurantId, food_name: "Seafood Pizza", description: "Seafood pizza with shrimp, mussels, and calamari.", price: 17.99, category: "main_dish", imgId: 20 },
      { Restaurants_id: restaurantId, food_name: "Chocolate Cake", description: "Classic chocolate cake with rich cocoa flavor and creamy frosting.", price: 5.99, category: "desserts", imgId: 21 },
      { Restaurants_id: restaurantId, food_name: "Lemon Cake", description: "Tart lemon cake with a tangy lemon glaze and fresh berries.", price: 6.49, category: "desserts", imgId: 22 },
      { Restaurants_id: restaurantId, food_name: "Apple Pie", description: "Freshly baked apple pie with a buttery crust and cinnamon apples.", price: 4.99, category: "desserts", imgId: 23 },
      { Restaurants_id: restaurantId, food_name: "Chocolate Mousse", description: "Decadent chocolate mousse with whipped cream and chocolate shavings.", price: 6.99, category: "desserts", imgId: 24 },
      { Restaurants_id: restaurantId, food_name: "Strawberry Cheesecake", description: "Rich cheesecake topped with fresh strawberries and a graham cracker crust.", price: 7.49, category: "desserts", imgId: 25 },
      { Restaurants_id: restaurantId, food_name: "Tiramisu", description: "Light and fluffy tiramisu with layers of espresso-soaked ladyfingers.", price: 6.29, category: "desserts", imgId: 26 },
      { Restaurants_id: restaurantId, food_name: "Panna Cotta", description: "Vanilla panna cotta with a rich berry coulis and fresh mint.", price: 5.49, category: "desserts", imgId: 27 },
      { Restaurants_id: restaurantId, food_name: "Crème Brûlée", description: "Classic crème brûlée with a crispy caramelized sugar top.", price: 6.79, category: "desserts", imgId: 28 },
      { Restaurants_id: restaurantId, food_name: "Chocolate Lava Cake", description: "Warm chocolate lava cake with a molten chocolate center.", price: 7.99, category: "desserts", imgId: 29 },
      { Restaurants_id: restaurantId, food_name: "Zeppole", description: "Crispy fried dough balls drizzled with honey and dusted with powdered sugar.", price: 5.59, category: "desserts", imgId: 30 },
      { Restaurants_id: restaurantId, food_name: "Lemonade", description: "Refreshing lemonade made with fresh lemons and a touch of mint.", price: 2.99, category: "drinks", imgId: 31 },
      { Restaurants_id: restaurantId, food_name: "Iced Coffee", description: "A rich and creamy iced coffee made with espresso, milk, and ice.", price: 3.49, category: "drinks", imgId: 32 },
      { Restaurants_id: restaurantId, food_name: "Pina Colada", description: "A tropical blend of pineapple, coconut, and orange juices.", price: 4.99, category: "drinks", imgId: 33 },
      { Restaurants_id: restaurantId, food_name: "Hot Chocolate", description: "Smooth and creamy hot chocolate topped with whipped cream and chocolate shavings.", price: 3.29, category: "drinks", imgId: 34 },
      { Restaurants_id: restaurantId, food_name: "Mojito", description: "A classic cocktail made with rum, lime juice, and a hint of sugar.", price: 5.99, category: "drinks", imgId: 35 },
    ]);

    // Step 3: seed a few sample orders linked to the same restaurant
    await Order.insertMany([
      { restaurant_id: restaurantId, total_amount: 45.99, status: "pending", items: [] },
      { restaurant_id: restaurantId, total_amount: 30.50, status: "completed", items: [] },
      { restaurant_id: restaurantId, total_amount: 25.75, status: "on the way", items: [] },
    ]);

    // eslint-disable-next-line no-console
    console.log("Database seeded successfully!");
    mongoose.disconnect();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Seed error:", error.message);
    mongoose.disconnect();
    process.exit(1);
  }
};

seed();
