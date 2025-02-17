import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import itemRouter from "./routes/menu.js";
import userRouter from "./routes/user.js";

import "./controllers/auth.js";
// import authRouter from "./routes/auth.js";
import menuRouter from "./routes/menu.js";
import orderRouter from "./routes/orderRoutes.js";
// import authRouter from "./routes/auth.js";
import authRouter from "./routes/authRoute.js";
import "./controllers/auth.js";
import restaurantsRouter from "./routes/restaurants.js";
import cookieParser from "cookie-parser";

dotenv.config();

// Create an express server
const app = express();
// Define allowed origins
// const allowedOrigins = [
//   "http://localhost:8080",
//   "https://c49-group-b.hackyourfuture.tech",
// ];

// Tell express to use the json middleware
app.use(cookieParser());
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
// app.use(
//   cors({
//     // origin: allowedOrigins,
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg =
//           "The CORS policy for this site does not allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   }),
// );

app.use(cors());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */

// Attach both auth and user routes
app.use("/api", authRouter);
app.use("/api/user", userRouter);

// Attach menu and order routes
app.use("/api/menu", menuRouter);
app.use("/api/menu", itemRouter);

app.use("/api/restaurants", restaurantsRouter);
app.use("/api/restaurants", restaurantsRouter);
app.use("/api/order", orderRouter);

export default app;
