import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/user.js";
import menuRouter from "./routes/menu.js";
import orderRouter from "./routes/orderRoutes.js";
import restaurantsRouter from "./routes/restaurants.js";

dotenv.config();

const app = express();

// Parse cookies (needed to read the JWT token set during login)
app.use(cookieParser());

// Parse incoming JSON request bodies
app.use(express.json());

// Allow the frontend (running on a different port in dev) to make requests to this server.
// credentials: true is required so the browser sends cookies (our JWT token) with every request.
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:8080",
    credentials: true,
  }),
);

// Auth routes: POST /api/signup, POST /api/login, POST /api/ (token verification)
app.use("/api", authRouter);

// User routes: /api/user/...
app.use("/api/user", userRouter);

// Menu routes: GET /api/menu, /api/menu/starters, /api/menu/pizzas, etc.
app.use("/api/menu", menuRouter);

// Restaurant routes: GET /api/restaurants
app.use("/api/restaurants", restaurantsRouter);

// Order routes: GET/POST /api/order, PUT/DELETE /api/order/:id
app.use("/api/order", orderRouter);

export default app;
