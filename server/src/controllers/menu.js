import Item from "../models/Item.js";
import { logError } from "../util/logging.js";

export const getItem = async (req, res, filter) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const filterCriteria = filter ? { category: filter } : {};

    const items = await Item.find(filterCriteria).skip(skip).limit(limit);

    const totalItems = await Item.countDocuments(filterCriteria);
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      success: true,
      result: items,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get items, try again later",
    });
  }
};
