import bcrypt from "bcrypt";
import prisma from "../db/prisma.js";
import createSecretToken from "../util/SecretToken.js";
import { logError } from "../util/logging.js";

// Cookie options for the auth token. In production the frontend (e.g. Netlify)
// and backend live on different domains, so the cookie must be SameSite=None
// and Secure or the browser will silently drop it. Locally we use Lax.
const isProd = process.env.NODE_ENV === "production";
const tokenCookieOptions = {
  httpOnly: false,
  sameSite: isProd ? "none" : "lax",
  secure: isProd,
  maxAge: 3 * 24 * 60 * 60 * 1000,
};

// Never send the password hash back to the client.
const publicUser = (user) => {
  // eslint-disable-next-line no-unused-vars
  const { password, ...rest } = user;
  return { ...rest, _id: user.id };
};

const Signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email, username and password" });
    }

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash here since Prisma has no Mongoose-style pre-save hooks.
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, username, password: hashedPassword },
    });

    const token = createSecretToken(user.id);
    res.cookie("token", token, tokenCookieOptions);
    res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user: publicUser(user),
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ message: "Something went wrong during signup", success: false });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Incorrect password of email" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ message: "Incorrect password of email" });
    }

    const token = createSecretToken(user.id);
    res.cookie("token", token, tokenCookieOptions);
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ message: "Something went wrong during login", success: false });
  }
};

export { Login, Signup };
