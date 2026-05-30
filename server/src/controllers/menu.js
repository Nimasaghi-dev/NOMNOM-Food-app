import prisma from "../db/prisma.js";
import { logError } from "../util/logging.js";

export const getItem = async (req, res, filter) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const where = filter ? { category: filter } : {};

    const [items, totalItems] = await Promise.all([
      prisma.item.findMany({
        where,
        skip,
        take: limit,
        orderBy: { imgId: "asc" },
      }),
      prisma.item.count({ where }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      success: true,
      // Expose `_id` so the frontend (which keys items by _id) keeps working.
      result: items.map((item) => ({ ...item, _id: item.id })),
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
