const Tickets = require("../../models/Tickets");
module.exports = async (req, res) => {
	const { id } = req.body;
	let ticket;
	try {
		ticket = await Tickets.findByIdAndRemove(id);
		if (ticket) {
			res.send(ticket);
		}else{
			res.status(401).send({
				ok: false,
				error: "No se encontró algún ticket con esa id",
			});
		}
	} catch (e) {
		res.status(500).send({ error: e });
	}
};
