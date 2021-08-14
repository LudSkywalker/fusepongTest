const Tickets = require("../../models/Tickets");
module.exports = async (req, res) => {
	const { titulo, descripcion, estado, id } = req.body;
	let update = { titulo, descripcion, estado };
	try {
		let ticket = await Tickets.findByIdAndUpdate(id, update);
		if (ticket) {
			res.send(ticket);
		} else {
			res.status(401).send({
				ok: false,
				error: "No se encontró algún ticket con esa id",
			});
		}
	} catch (e) {
		res.status(500).send({ error: e });
	}
};
