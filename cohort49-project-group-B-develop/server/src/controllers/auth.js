import env from "dotenv";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

env.config();
const CALLBACK_URL =
  process.env.NODE_ENV === "production"
    ? "https://c49-group-b.hackyourfuture.tech/auth/google/callback"
    : "http://localhost:3000/auth/google/callback";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "default_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      // Handle user data (e.g., create or fetch the user from the database)
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user); // Store user in session
});

passport.deserializeUser((user, done) => {
  done(null, user); // Retrieve user from session
});
