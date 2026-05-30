import { pathToFileURL } from "url";
import prisma from "./prisma.js";

// Seeds the menu data (restaurant + items + sample orders) into the database.
// Exported so the server can auto-seed an empty DB on startup, and reused by
// the `npm run seed` CLI below. Does NOT touch the User table.
export const seedDatabase = async () => {
  // Clear menu-related tables before re-seeding so we start fresh.
  // Order matters because of foreign keys (orders/reviews/items -> restaurant).
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.item.deleteMany();
  await prisma.restaurant.deleteMany();

  // Step 1: create the restaurant first so we can link items/orders to its id.
  const restaurant = await prisma.restaurant.create({
    data: {
      name: "La Bella Pizza",
      address: "123 Main Street, Amsterdam, Netherlands",
      phone: "+31 20 123 4567",
      email: "labella.pizza@example.com",
      cuisine: "Italian",
    },
  });

  const restaurantId = restaurant.id;

  // Step 2: seed menu items, each linked to the restaurant created above.
  await prisma.item.createMany({
    data: [
      {
        restaurantId,
        food_name: "Fried Calamari",
        description: "Crispy breaded calamari served with marinara sauce",
        price: 9.99,
        category: "starter",
        imgId: 1,
      },
      {
        restaurantId,
        food_name: "Roasted Vegetables",
        description:
          "A selection of seasonal vegetables, roasted to perfection",
        price: 7.99,
        category: "starter",
        imgId: 2,
      },
      {
        restaurantId,
        food_name: "Caprese Salad",
        description:
          "Fresh mozzarella, ripe tomatoes, and basil with a balsamic glaze",
        price: 8.5,
        category: "starter",
        imgId: 3,
      },
      {
        restaurantId,
        food_name: "Garlic Breadsticks",
        description: "Breadsticks served with marinara dipping sauce",
        price: 5.99,
        category: "starter",
        imgId: 4,
      },
      {
        restaurantId,
        food_name: "Buffalo Wings",
        description: "Spicy chicken wings with a side of blue cheese dip",
        price: 10.99,
        category: "starter",
        imgId: 5,
      },
      {
        restaurantId,
        food_name: "Mixed Salad",
        description: "Fresh mixed greens with Italian vinaigrette",
        price: 6.5,
        category: "starter",
        imgId: 6,
      },
      {
        restaurantId,
        food_name: "Bruschetta",
        description: "Mini bruschettas with tomatoes, garlic, and basil",
        price: 7.25,
        category: "starter",
        imgId: 7,
      },
      {
        restaurantId,
        food_name: "Mozzarella Sticks",
        description: "Crispy mozzarella sticks served with marinara sauce",
        price: 8.0,
        category: "starter",
        imgId: 8,
      },
      {
        restaurantId,
        food_name: "Antipasto Platter",
        description: "Italian cured meats, olives, and cheeses",
        price: 12.0,
        category: "starter",
        imgId: 9,
      },
      {
        restaurantId,
        food_name: "Focaccia Bread",
        description: "Homemade focaccia bread with rosemary and olive oil",
        price: 4.99,
        category: "starter",
        imgId: 10,
      },
      {
        restaurantId,
        food_name: "Margherita Pizza",
        description:
          "Classic margherita pizza with fresh mozzarella and basil.",
        price: 9.99,
        category: "main_dish",
        imgId: 11,
      },
      {
        restaurantId,
        food_name: "Pepperoni Pizza",
        description:
          "Pepperoni pizza with a crispy crust and a rich tomato sauce.",
        price: 12.99,
        category: "main_dish",
        imgId: 12,
      },
      {
        restaurantId,
        food_name: "Vegetarian Pizza",
        description: "Vegetarian pizza with a variety of fresh vegetables.",
        price: 11.49,
        category: "main_dish",
        imgId: 13,
      },
      {
        restaurantId,
        food_name: "BBQ Chicken Pizza",
        description:
          "BBQ chicken pizza with smoky barbecue sauce and tender chicken.",
        price: 13.49,
        category: "main_dish",
        imgId: 14,
      },
      {
        restaurantId,
        food_name: "Hawaiian Pizza",
        description: "Hawaiian pizza with pineapple and ham on a golden crust.",
        price: 12.49,
        category: "main_dish",
        imgId: 15,
      },
      {
        restaurantId,
        food_name: "Mushroom Pizza",
        description: "Mushroom pizza with garlic and a blend of rich cheeses.",
        price: 11.99,
        category: "main_dish",
        imgId: 16,
      },
      {
        restaurantId,
        food_name: "Spicy Sausage Pizza",
        description:
          "Spicy pizza with Italian sausage, jalapenos, and mozzarella.",
        price: 13.99,
        category: "main_dish",
        imgId: 17,
      },
      {
        restaurantId,
        food_name: "Four Cheese Pizza",
        description:
          "Four-cheese pizza with mozzarella, cheddar, parmesan, and blue cheese.",
        price: 14.49,
        category: "main_dish",
        imgId: 18,
      },
      {
        restaurantId,
        food_name: "Meat Lover's Pizza",
        description:
          "Meat lover's pizza with pepperoni, sausage, bacon, and ham.",
        price: 15.99,
        category: "main_dish",
        imgId: 19,
      },
      {
        restaurantId,
        food_name: "Seafood Pizza",
        description: "Seafood pizza with shrimp, mussels, and calamari.",
        price: 17.99,
        category: "main_dish",
        imgId: 20,
      },
      {
        restaurantId,
        food_name: "Chocolate Cake",
        description:
          "Classic chocolate cake with rich cocoa flavor and creamy frosting.",
        price: 5.99,
        category: "desserts",
        imgId: 21,
      },
      {
        restaurantId,
        food_name: "Lemon Cake",
        description:
          "Tart lemon cake with a tangy lemon glaze and fresh berries.",
        price: 6.49,
        category: "desserts",
        imgId: 22,
      },
      {
        restaurantId,
        food_name: "Apple Pie",
        description:
          "Freshly baked apple pie with a buttery crust and cinnamon apples.",
        price: 4.99,
        category: "desserts",
        imgId: 23,
      },
      {
        restaurantId,
        food_name: "Chocolate Mousse",
        description:
          "Decadent chocolate mousse with whipped cream and chocolate shavings.",
        price: 6.99,
        category: "desserts",
        imgId: 24,
      },
      {
        restaurantId,
        food_name: "Strawberry Cheesecake",
        description:
          "Rich cheesecake topped with fresh strawberries and a graham cracker crust.",
        price: 7.49,
        category: "desserts",
        imgId: 25,
      },
      {
        restaurantId,
        food_name: "Tiramisu",
        description:
          "Light and fluffy tiramisu with layers of espresso-soaked ladyfingers.",
        price: 6.29,
        category: "desserts",
        imgId: 26,
      },
      {
        restaurantId,
        food_name: "Panna Cotta",
        description:
          "Vanilla panna cotta with a rich berry coulis and fresh mint.",
        price: 5.49,
        category: "desserts",
        imgId: 27,
      },
      {
        restaurantId,
        food_name: "Crème Brûlée",
        description:
          "Classic crème brûlée with a crispy caramelized sugar top.",
        price: 6.79,
        category: "desserts",
        imgId: 28,
      },
      {
        restaurantId,
        food_name: "Chocolate Lava Cake",
        description: "Warm chocolate lava cake with a molten chocolate center.",
        price: 7.99,
        category: "desserts",
        imgId: 29,
      },
      {
        restaurantId,
        food_name: "Zeppole",
        description:
          "Crispy fried dough balls drizzled with honey and dusted with powdered sugar.",
        price: 5.59,
        category: "desserts",
        imgId: 30,
      },
      {
        restaurantId,
        food_name: "Lemonade",
        description:
          "Refreshing lemonade made with fresh lemons and a touch of mint.",
        price: 2.99,
        category: "drinks",
        imgId: 31,
      },
      {
        restaurantId,
        food_name: "Iced Coffee",
        description:
          "A rich and creamy iced coffee made with espresso, milk, and ice.",
        price: 3.49,
        category: "drinks",
        imgId: 32,
      },
      {
        restaurantId,
        food_name: "Pina Colada",
        description:
          "A tropical blend of pineapple, coconut, and orange juices.",
        price: 4.99,
        category: "drinks",
        imgId: 33,
      },
      {
        restaurantId,
        food_name: "Hot Chocolate",
        description:
          "Smooth and creamy hot chocolate topped with whipped cream and chocolate shavings.",
        price: 3.29,
        category: "drinks",
        imgId: 34,
      },
      {
        restaurantId,
        food_name: "Mojito",
        description:
          "A classic cocktail made with rum, lime juice, and a hint of sugar.",
        price: 5.99,
        category: "drinks",
        imgId: 35,
      },
    ],
  });

  // Step 3: seed a few sample orders linked to the same restaurant.
  await prisma.order.createMany({
    data: [
      { restaurantId, total_amount: 45.99, status: "pending", items: [] },
      { restaurantId, total_amount: 30.5, status: "completed", items: [] },
      { restaurantId, total_amount: 25.75, status: "on the way", items: [] },
    ],
  });
};

// CLI entry point: run with `npm run seed` (from the server folder).
const runSeedCLI = async () => {
  try {
    await prisma.$connect();
    await seedDatabase();
    // eslint-disable-next-line no-console
    console.log("Database seeded successfully!");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Seed error:", error.message);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

// Only run the CLI when this file is executed directly (not when imported).
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  runSeedCLI();
}
