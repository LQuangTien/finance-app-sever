const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const financeRouter = require("./routes/finance.route");
const authRouter = require("./routes/auth.route");
const todoRouter = require("./routes/todo.route");
const handleError = require("./helpers/handleError.helper");

const authMiddleware = require("./middlewares/auth.middleware");

const app = express();
app.use(cors());
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/todo", authMiddleware.requireAuth, todoRouter);
app.use("/", authMiddleware.requireAuth, financeRouter);
app.use(handleError);
const listener = app.listen($PORT, function () {
  console.log("Listening on port " + listener.address().port);
});
