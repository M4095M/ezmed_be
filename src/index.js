const express = require("express");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

/*  calling app middlewares */
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("uploads"));
/*  Calling the routes */
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to our application." });
});

app.use("/api/v1", require("./api/v1/routes/index.js"));

/*  Generate Error 404 in case route wasn't found */
app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

/*  Handle Error Messages */
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

/*  Starting the server */
const Port = process.env.PORT || 8000;
app.listen(Port, () => {
  console.log(`server up and running on PORT ${Port}`);
});
