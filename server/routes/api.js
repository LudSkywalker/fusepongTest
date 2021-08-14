const { Router } = require("express");
//Import Tickets
const getTickets = require("../controllers/tickets/getTickets");
const getCompanyTickets = require("../controllers/tickets/getCompanyTickets");
const createTicket = require("../controllers/tickets/createTicket");
const deleteTicket = require("../controllers/tickets/deleteTicket");
const updateTicket = require("../controllers/tickets/updateTicket");

//Import HDUsers
const getHDUsers = require("../controllers/hdusers/getHDUsers");
const createHDUser = require("../controllers/hdusers/createHDUser");
const deleteHDUser = require("../controllers/hdusers/deleteHDUser");
const updateHDUser = require("../controllers/hdusers/updateHDUser");

//Import Middleware

const isAuth = require("../middlewares/isAuth");

const api = Router();

api.use(isAuth);

//Test if auth is valid
api.get("/", (req, res) => {
    res.send({auth: true, mensage:"Tu jwt aún es válido"})
});


// Tickets routes
api.get("/tickets", getTickets);
api.get("/tickets/:company", getCompanyTickets);
api.post("/ticket", createTicket);
api.delete("/ticket", deleteTicket);
api.put("/ticket", updateTicket);

// HDUsers routes
api.get("/hdusers", getHDUsers);
api.post("/hduser", createHDUser);
api.delete("/hduser", deleteHDUser);
api.put("/hduser", updateHDUser);

module.exports = api;
