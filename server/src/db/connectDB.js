import dotenv from "dotenv";
import prisma from "./prisma.js";
import { logInfo } from "../util/logging.js";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

const connectDB = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Did you create a .env file in the server folder (and start Postgres with `docker compose up -d`)?",
    );
  }

  // Verify the connection up front so startup fails fast with a clear message.
  await prisma.$connect();
  logInfo("PostgreSQL connected via Prisma");

  // In local dev, seed demo data automatically when the database is empty so
  // the home and menu pages have something to show on first run.
  if (!isProd) {
    const itemCount = await prisma.item.count();
    if (itemCount === 0) {
      const { seedDatabase } = await import("./seedDB.js");
      await seedDatabase();
      logInfo("Database was empty — seeded demo restaurant and menu items");
    }
  }
};

export default connectDB;
