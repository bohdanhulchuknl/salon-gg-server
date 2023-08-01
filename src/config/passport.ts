import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import User from "../models/User.model";
import { getClearDbUser } from "../services/user.service";

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
      User.findOne({ googleId: profile.id }).lean().then((currentUser:any) => {
        if (currentUser) {
          console.log(currentUser, "ex");
          return cb(null, getClearDbUser(currentUser));
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
            .then((newUser:any) => {
              console.log(newUser, "create");
              return cb(null, getClearDbUser(newUser));
            });
        }
      });
      // cb(null, profile);
    }
  )
);
