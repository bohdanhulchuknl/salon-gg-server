import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
//
import { corsOptions } from "./config/corsOptions";
import authRouter from "./routes/auth.route";
import serviceRouter from "./routes/services.route";
import connectDB from "./config/dbConnect";
//
dotenv.config();
import "./config/passport";
import orderRouter from "./routes/order.route";
import editorRouter from "./routes/editor.route";
//
//
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
// Middleware
app.use(express.json());
// cors
app.use(cors(corsOptions));

app.set("trust proxy", 1);
// session
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
    },
  })
);
//passport
app.use(passport.initialize());
app.use(passport.session());
// routes
app.get("/", (req, res) => {
  res.send("Helllo WOlrd");
});
app.use("/auth", authRouter);
app.use("/service", serviceRouter);
app.use("/order", orderRouter);
app.use("/editor", editorRouter);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection open");
  app.listen(PORT, () => {
    console.log(`Server Started on port: ${PORT}`);
  });
});
