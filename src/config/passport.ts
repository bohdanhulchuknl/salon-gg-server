import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import User from "../models/User.model";

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user: any, done) => {
  return done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: "/auth/google/callback",
    },
    function (_, __, profile, cb) {
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log(currentUser, "ex");
          delete currentUser.__v
          return cb(null, currentUser);
        } else {
          new User({
            googleId: profile.id,
            name: profile.displayName,
            locale: profile._json.locale!,
            picture: profile._json.picture!,
            emails: profile.emails
              ? profile.emails
              : [{ value: "", verified: false }],
            phone: {
              value: "",
              verified: false,
            },
          })
            .save()
            .then((newUser) => {
              console.log(newUser, "create");
              delete newUser.__v
              return cb(null, newUser);
            });
        }
      });
      // cb(null, profile);
    }
  )
);
