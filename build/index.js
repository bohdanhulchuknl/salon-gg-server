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
//
var corsOptions_1 = require("./config/corsOptions");
var auth_route_1 = __importDefault(require("./routes/auth.route"));
//
dotenv_1.default.config();
require("./config/passport");
//
//
var app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// cors
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
app.set("trust proxy", 1);
// session
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
//passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//!PASSPORT here
// routes
app.use("/auth", auth_route_1.default);
app.get("/", function (req, res) {
    res.send("Helllo WOlrd");
});
app.listen(process.env.PORT || 5000, function () {
    console.log("Server Starrted");
});
