"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_google_oauth20_1 = require("passport-google-oauth20");
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
