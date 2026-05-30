import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";

dotenv.config();

const userVerification = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    }
    const user = await prisma.user.findUnique({ where: { id: data.id } });
    if (user) return res.json({ status: true, user: user.username });
    return res.json({ status: false });
  });
};

export default userVerification;
