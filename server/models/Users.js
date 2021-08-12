const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const usersSchema = new Schema({
	nombre: { type: String, required: true },
	correo: { type: String, required: true },
	password: { type: String, required: true },
	compañia: [{ type: Schema.Types.ObjectId, ref: "Companies" }],
});
usersSchema.methods.encrypt = async (password) => {
	const salt = await bcrypt.genSalt(7);
	return await bcrypt.hash(password, salt);
};
usersSchema.methods.matchEncrypt = function (password) {
	return bcrypt.compare(password, this.password);
};

module.exports = model("Users", usersSchema);
