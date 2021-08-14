const app= require("./app");

//Run the server in the env port
(async () => {
	await app.listen(app.get("port"));
	console.log("Sever on port", app.get("port"));
})();
