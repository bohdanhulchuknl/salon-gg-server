import { Router } from "express";
import passport from "passport";

const authRouter = Router();

//! "https://www.googleapis.com/auth/user.phonenumbers.read" отримати доступ 
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://salon-gg-client.vercel.app",
    session: true,
  }),
  function (req, res) {
    res.redirect("https://salon-gg-client.vercel.app");
  }
);

authRouter.get("/getuser", (req, res) => {
  res.send(req.user);
});

authRouter.get("/logout", (req, res, next) => {
    //here
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("done");
  });
});

export default authRouter;
