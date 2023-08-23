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
var mongoose_1 = __importDefault(require("mongoose"));
//
var corsOptions_1 = require("./config/corsOptions");
var auth_route_1 = __importDefault(require("./routes/auth.route"));
var services_route_1 = __importDefault(require("./routes/services.route"));
var dbConnect_1 = __importDefault(require("./config/dbConnect"));
//
dotenv_1.default.config();
require("./config/passport");
var order_route_1 = __importDefault(require("./routes/order.route"));
var editor_route_1 = __importDefault(require("./routes/editor.route"));
//
//
var app = (0, express_1.default)();
var PORT = process.env.PORT || 5000;
(0, dbConnect_1.default)();
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
// routes
app.get("/", function (req, res) {
    res.send("Helllo WOlrd");
});
app.use("/auth", auth_route_1.default);
app.use("/service", services_route_1.default);
app.use("/order", order_route_1.default);
app.use("/editor", editor_route_1.default);
mongoose_1.default.connection.once("open", function () {
    console.log("MongoDB connection open");
    app.listen(PORT, function () {
        console.log("Server Started on port: ".concat(PORT));
    });
});
