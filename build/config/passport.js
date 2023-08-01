"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_google_oauth20_1 = require("passport-google-oauth20");
var User_model_1 = __importDefault(require("../models/User.model"));
var user_service_1 = require("../services/user.service");
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
    User_model_1.default.findOne({ googleId: profile.id }).lean().then(function (currentUser) {
        if (currentUser) {
            console.log(currentUser, "ex");
            return cb(null, (0, user_service_1.getClearDbUser)(currentUser));
        }
        else {
            new User_model_1.default({
                googleId: profile.id,
                name: profile.displayName,
                locale: profile._json.locale,
                picture: profile._json.picture,
                emails: profile.emails
                    ? profile.emails
                    : [{ value: "", verified: false }],
                phone: {
                    value: "",
                    verified: false,
                },
            })
                .save()
                .then(function (newUser) {
                console.log(newUser, "create");
                return cb(null, (0, user_service_1.getClearDbUser)(newUser._doc));
            });
        }
    });
    // cb(null, profile);
}));
