const Tickets = require("../../models/Tickets");
module.exports = async (req, res) => {
	const { company } = req.params;
	let tickets;
	try {
		ticket = await Tickets.find({}).populate("hdUsuario");
		tickets = tickets.filter(
			(ticket) =>
				ticket.hdUsuario[0]?.compañia[0]?._id?.toString() == company
		);
		tickets = tickets.map((ticket) => {
			let {
				_id: id,
				titulo,
				descripcion,
				estado,
				hdUsuario,
			} = ticket.toJSON();
			let [hdu] = hdUsuario;
			return { id, titulo, descripcion, estado, hdu };
		});
		res.send(tickets);
	} catch (e) {
		res.status(500).send({ error: e });
	}
};
