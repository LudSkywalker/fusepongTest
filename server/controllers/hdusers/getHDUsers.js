const HDUsers = require("../../models/HDUsers");
module.exports = async (req, res) => {
	let hdusers;
	try {
		hdusers = await HDUsers.find(req.body).populate("compañia");
		hdusers = hdusers.map((hduser) => {
			let { _id: id, titulo, descripcion, compañia } = hduser.toJSON();
			let [com] = compañia;
			return { id, titulo, descripcion, com };
		});
		res.send(hdusers);
	} catch (e) {
		res.status(500).send({ error: e });
	}
};
