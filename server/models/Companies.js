const { Schema, model } = require("mongoose");
const companiesSchema = new Schema({
	nombre: {type:String, required:true},
	nit: {type:String, required:true},
	telefono: String,
	direccion: String,
	correo: {type:String, required:true},
	historial: [[String,Date]],
});
module.exports = model("Companies", companiesSchema);
