const mongoose = require("mongoose");
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
		console.log("db is conected");
	} catch (e) {
        console.error(e);
	}
})();
module.exports = mongoose;
