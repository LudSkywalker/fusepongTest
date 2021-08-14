const { Router } = require("express");
const singup = require("../controllers/auth/singup");
const login = require("../controllers/auth/login");
const companies = require("../controllers/auth/companies");

const auth = Router();

auth.post("/singup", singup);
auth.post("/login", login);
auth.get("/companies", companies);

module.exports = auth;
