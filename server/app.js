if (process.env.NODE_ENV != "production") {
	require("dotenv").config({ path: "../.env" });
}
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("./db");

const app = express();

//Settings
app.set("json spaces", 2);
app.set("port", process.env.PORT || 4000);

//Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/auth", require("./routes/auth"));
app.use("/api", require("./routes/api"));

module.exports = app;
