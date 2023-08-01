import { Router } from "express";
import passport from "passport";

const authRouter = Router();

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

authRouter.get("/auth/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("done");
  });
});

export default authRouter;
