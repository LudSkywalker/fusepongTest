if (process.env.NODE_ENV != "production") {
	require("dotenv").config({ path: "../.env" });
}
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("./db")

//Instans of server
const app = express();

//Settings of server
app.set("json spaces", 2);
app.set("port", process.env.PORT || 4000);

//Implement of middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

//Implement of routes
app.use("/auth", require("./routes/auth"));

//Run the server in the env port
(async () => {
	await app.listen(app.get("port"));
	console.log("Sever on port", app.get("port"));
})();
