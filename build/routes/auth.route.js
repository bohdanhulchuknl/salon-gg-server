"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var authRouter = (0, express_1.Router)();
authRouter.get("/google", passport_1.default.authenticate("google", { scope: ["email", "profile", "phone"] }));
authRouter.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "https://salon-gg-client.vercel.app",
    session: true,
}), function (req, res) {
    res.redirect("https://salon-gg-client.vercel.app");
});
authRouter.get("/getuser", function (req, res) {
    res.send(req.user);
});
authRouter.get("/logout", function (req, res, next) {
    //here
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.send("done");
    });
});
exports.default = authRouter;
