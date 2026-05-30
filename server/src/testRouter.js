import express from "express";

import prisma from "./db/prisma.js";
import { logError } from "./util/logging.js";

const testRouter = express.Router();

// Used by Cypress/e2e tests to reset the database to a known state.
// This router is only mounted when NODE_ENV !== "production" (see index.js),
// and we double-check here so it can never wipe a production database.
testRouter.post("/seed", async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    const msg = "Database seeding is disabled in production.";
    logError(msg);
    return res.status(400).json({ success: false, msg });
  }

  try {
    // Clear everything (FK order matters).
    await prisma.order.deleteMany();
    await prisma.review.deleteMany();
    await prisma.item.deleteMany();
    await prisma.restaurant.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.create({
      data: {
        username: "Rob",
        email: "rob@hackyourfuture.net",
        password: "seeded-test-user",
      },
    });

    const users = await prisma.user.findMany();
    res.status(201).json({ success: true, data: { users } });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, msg: error.message });
  }
});

export default testRouter;
