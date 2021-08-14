const Users = require("../../models/Users");
const jwt = require("jsonwebtoken");
module.exports = async (req, res) => {
	const { correo, password } = req.body;
	token = "";
	try {
		let user = await Users.findOne({ correo });
		let match = await user?.matchEncrypt(password);
		if (match) {
			let { _id: id, nombre, compañia } = user;
			let token = jwt.sign(
				{ id, nombre, com: compañia[0] },
				process.env.JWT_SECRET,
				{
					expiresIn: 60 * 60 * 16,
				}
			);
			res.send({ token });
		} else {
			res.status(401).send({
				auth: false,
				error: "El correo y/o la contraseña son incorrectos",
			});
		}
	} catch (e) {
		res.status(500).send({ error: e });
	}
};
