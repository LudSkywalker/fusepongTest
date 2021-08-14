const Users = require("../../models/Users");
const jwt = require("jsonwebtoken");
module.exports = async (req, res) => {
	const { nombre, correo, password, compañia } = req.body;
	try {
		let user = await Users.findOne({ correo });
		if (!user) {
			const newUser = new Users({
				nombre,
				correo,
				password,
				compañia,
			});
			newUser.password = await newUser.encrypt(newUser.password);
			await newUser.save();

			const token = jwt.sign(
				{ id: newUser._id, nombre },
				process.env.JWT_SECRET,
				{
					expiresIn: 60 * 60 * 16,
				}
			);
			res.status(201).send({ auth: true, token });
		} else {
			res.status(401).send({
				auth: false,
				error: "El correo electrónico ya está registrado",
			});
		}
	} catch (e) {
		res.status(500).send({ error: e });
	}
};
