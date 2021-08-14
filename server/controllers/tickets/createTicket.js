const Tickets = require("../../models/Tickets");
module.exports = async (req, res) => {
	const { titulo, descripcion, estado, hdUsuario } = req.body;
	try {
		let ticket = new Tickets({
			titulo,
			descripcion,
			estado,
			hdUsuario,
		});
		ticket = await ticket.save();
		res.send(ticket);
	} catch (e) {
		res.status(500).send({ error: e });
	}
};
