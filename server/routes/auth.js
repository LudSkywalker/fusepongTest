const { Router } = require("express");
const Companies = require("../models/Companies");
const Users = require("../models/Users");

const auth = Router();

auth.post("/login", async (req, res) => {
	const { correo, password } = req.body;
	let user = await Users.findOne({ correo });
	let match = await user?.matchEncrypt(password);
	if (match) {
		res.send({ auth: true, token: "" });
	} else {
		res.status(401).send({
			auth: false,
			error: "El correo y/o la contraseña son incorrectos",
		});
	}
});

auth.get("/companies", async (req, res) => {
	let companies = [];
	try {
		companies = await Companies.find();
		companies = companies.map((company) => {
			let { _id: id, nombre, nit, telefono } = company.toJSON();
			return { id, nombre, nit, telefono };
		});
		console.log(companies);
		res.send(companies);
	} catch (e) {
		res.status(500).send({ error: e });
	}
});

auth.get("/test", async (req, res) => {
	const com = new Companies({
		correo: "admin@gmail.com",
		nombre: "ludss",
		nit: "nitaa",
	});
	const usu = new Users({
		nombre: "ludss",
		correo: "admin@gmail.com",
		password: "lud",
		compañia: "611587c20f55fef5d479822e",
	});
	usu.password = await usu.encrypt(usu.password);
	let data = "";
	try {
		// data=await com.save();
		// console.log(await Companies.find());
		// await Companies.deleteMany({});
		// data=await usu.save();
		// let data = await Users.find({}).populate("compañia");
		// data =  await Users.deleteMany({});
		res.send(data);
	} catch (e) {
		res.status(404).send({ error: e });
	}
});

module.exports = auth;
