const HDUsers = require("../../models/HDUsers");
module.exports = async (req, res) => {
	const { titulo, descripcion, estado, id } = req.body;
	let update = { titulo, descripcion, estado };
	try {
		let hduser = await HDUsers.findByIdAndUpdate(id, update);
		if (hduser) {
			res.send(hduser);
		} else {
			res.status(401).send({
				error: "No se encontró alguna historia de usuario con esa id",
			});
		}
	} catch (e) {
		res.status(500).send({ error: e });
	}
};
