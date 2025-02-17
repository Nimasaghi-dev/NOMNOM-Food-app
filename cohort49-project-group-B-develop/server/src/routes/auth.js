import express from "express";
import passport from "passport";
import session from "express-session";
import "../controllers/auth.js";

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// Google Authentication
app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin" }),
  (req, res) => {
    const redirectUrl =
      process.env.NODE_ENV === "production"
        ? "https://c49-group-b.hackyourfuture.tech/home"
        : "http://localhost:8080/home";
    res.redirect(redirectUrl);
  },
);

// Logout
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    const redirectUrl =
      process.env.NODE_ENV === "production"
        ? "https://c49-group-b.hackyourfuture.tech/signin"
        : "http://localhost:8080/signin";
    res.redirect(redirectUrl);
  });
});

export default app;
