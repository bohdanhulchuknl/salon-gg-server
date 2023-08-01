"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var express_session_1 = __importDefault(require("express-session"));
var passport_1 = __importDefault(require("passport"));
var passport_google_oauth20_1 = require("passport-google-oauth20");
dotenv_1.default.config();
var app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "https://salon-gg-client.vercel.app", credentials: true }));
app.set("trust proxy", 1);
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
    },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.serializeUser(function (user, done) {
    return done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    return done(null, user);
});
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: "".concat(process.env.GOOGLE_CLIENT_ID),
    clientSecret: "".concat(process.env.GOOGLE_CLIENT_SECRET),
    callbackURL: "/auth/google/callback",
}, function (_, __, profile, cb) {
    cb(null, profile);
}));
app.get("/auth/google", passport_1.default.authenticate("google", { scope: ["email", "profile"] }));
app.get("/auth/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "https://salon-gg-client.vercel.app",
    session: true,
}), function (req, res) {
    res.redirect("https://salon-gg-client.vercel.app");
});
app.get("/", function (req, res) {
    res.send("Helllo WOlrd");
});
app.get("/getuser", function (req, res) {
    res.send(req.user);
});
app.get("/auth/logout", function (req, res, next) {
    // console.log("here")
    // req.logout();
    // // if (req.user) {
    // //   return res.send("done");
    // // }
    // res.send("logout");
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.send("done");
    });
});
app.listen(process.env.PORT || 5000, function () {
    console.log("Server Starrted");
});
