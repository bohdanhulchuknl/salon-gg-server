import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
const GoogleStrategy = require("passport-google-oauth20").Strategy;

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({ origin: "https://salon-gg-client.vercel.app", credentials: true })
);

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: "/auth/google/callback",
    },
    function (_, __, profile, cb) {
      cb(null, profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://salon-gg-client.vercel.app",
    session: true,
  }),
  function (req, res) {
    res.redirect("https://salon-gg-client.vercel.app");
  }
);

app.get("/", (req, res) => {
  res.send("Helllo WOlrd");
});

app.get("/getuser", (req, res) => {
  res.send(req.user);
});

app.get("/auth/logout", (req, res) => {
  // console.log("here")
  // req.logout();

  // // if (req.user) {
  // //   return res.send("done");
  // // }
  // res.send("logout");
  req.logout(function(err) {
    if (err) { return next(err); }
    res.send("done");
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Starrted");
});
