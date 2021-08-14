const Tickets = require("../../models/Tickets");
module.exports = async (req, res) => {
	let tickets;
	try {
		tickets = await Tickets.find(req.body).populate("hdUsuario");
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
