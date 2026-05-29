import express from "express";
import { getItem } from "../controllers/menu.js";

const menuRouter = express.Router();

menuRouter.get("/", (req, res) => getItem(req, res));
menuRouter.get("/starters", (req, res) => getItem(req, res, "starter"));
menuRouter.get("/pizzas", (req, res) => getItem(req, res, "main_dish"));
menuRouter.get("/desserts", (req, res) => getItem(req, res, "desserts"));
menuRouter.get("/drinks", (req, res) => getItem(req, res, "drinks"));

export default menuRouter;
