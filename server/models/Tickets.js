const { Schema, model } = require("mongoose");
const ticketsSchema = new Schema({
	titulo: { type: String, required: true },
	descripcion: { type: String, required: true },
	estado: { type: String, required: true },
	hdUsuario: [{ type: Schema.Types.ObjectId, ref: "HDUsers" }],
});

module.exports = model("Tickets", ticketsSchema);
