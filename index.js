const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

passport.serializeUser((user, done) => {
    return done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
      console.log(user)
    return done(null, user);
  });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   callbackURL: "http://localhost:5000/auth/google/callback",
      callbackURL: "https://salon-gg-server.vercel.app/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/register" }),
  function (req, res) {
    res.redirect("https://salon-gg-client.vercel.app");
  }
);

app.get('/auth/logout' , (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect("https://salon-gg-client.vercel.app");
      });
    // req.logOut()
    // res.redirect("http://localhost:5173");
})

app.get('/protected' , (req, res) => {
    console.log(req.user)
    res.send(req.user)
})

app.listen(5000, () => {
  console.log(`Server started`);
});
