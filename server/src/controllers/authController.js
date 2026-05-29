import User from "../models/User.js";
import bcrypt from "bcrypt";
import createSecretToken from "../util/SecretToken.js";
import { logError } from "../util/logging.js";

const Signup = async (req, res, next) => {
  try {
    const { email, username, password, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      email,
      username,
      password,
      createdAt,
    });

    // Sign the token with the user's unique DB id, not the password
    const token = createSecretToken(user._id);

    // httpOnly: false so the client JS can read the cookie for auth checks
    // sameSite: "lax" allows the cookie to be sent on same-site navigations
    // maxAge: 3 days in milliseconds, matching the JWT expiry
    res.cookie("token", token, {
      httpOnly: false,
      sameSite: "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    logError(error);
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Incorrect password of email" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ message: "Incorrect password of email" });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: false,
      sameSite: "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    logError(error);
  }
};

export { Login, Signup };
