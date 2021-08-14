const Companies = require("../../models/Companies");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
	let companies = [];
	try {
		companies = await Companies.find();
		companies = companies.map((company) => {
			let { _id: id, nombre, nit, telefono } = company.toJSON();
			return { id, nombre, nit, telefono };
		});
		res.send(companies);
	} catch (e) {
		res.status(500).send({ error: e });
	}
};
