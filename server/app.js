
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./router/auth");
const userRouter = require("./router/user");
const adminRouter = require("./router/admin");
const imageRouter = require("./router/Image");

const app = express();

app.set("trust proxy", 1);

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/image", imageRouter);

module.exports = app;