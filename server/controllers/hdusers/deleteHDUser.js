const HDUsers = require("../../models/HDUsers");
module.exports = async (req, res) => {
	const { id } = req.body;
	let hduser;
	try {
		hduser = await HDUsers.findByIdAndRemove(id);
		if (hduser) {
			res.send(hduser);
		}else{
			res.status(401).send({
				error: "No se encontró alguna historia de usuario con esa id",
			});
		}
	} catch (e) {
		res.status(500).send({ error: e });
	}
};
