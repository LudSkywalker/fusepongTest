const { Schema, model } = require("mongoose");
const hdusersSchema = new Schema({
	titulo: { type: String, required: true },
	descripcion: { type: String, required: true },
	compañia: [{ type: Schema.Types.ObjectId, ref: "Companies" }],
});

module.exports = model("HDUsers", hdusersSchema);
