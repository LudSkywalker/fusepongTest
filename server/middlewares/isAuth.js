const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
	let { authorization } = req.headers;
	if (authorization) {
		[, token] = authorization.split(" ");
		try {
			let { id, nombre, com } = jwt.verify(
				token,
				process.env.JWT_SECRET
			);
			req.user = { id, nombre, com };
			next();
		} catch (e) {
			if (e.name == "TokenExpiredError") {
				res.status(401).send({ error: "Su token es inválido o ha caducado" });
			}else{
                res.status(500).send({ error: e });
            }
		}
	} else {
		res.status(401).send({ error: "Por favor ingrese su auth con jwt" });
	}
};
