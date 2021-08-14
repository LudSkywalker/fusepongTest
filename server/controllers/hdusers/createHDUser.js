const HDUsers = require("../../models/HDUsers");
module.exports = async (req, res) => {
	const { titulo, descripcion, compañia } = req.body;
	try {
		let hduser = new HDUsers({
			titulo,
			descripcion,
			compañia,
		});
		hduser = await hduser.save();
		res.send(hduser);
	} catch (e) {
		res.status(500).send({ error: e });
	}
};
