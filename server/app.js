const express = require("express");
const cors = require("cors");
const chalk = require("chalk");

const logRouter = require("./router/logs");
const { errorHandler } = require("./error/errorHandler");

const app = express();
const PORT = 3000;

app.use(
	cors({
		origin: "http://localhost:5173",
	})
);

// Middleware to parse JSON
app.use(express.json());
app.use("/", logRouter);
app.use(errorHandler);

app.listen(PORT, (error) => {
	if (error) {
		console.log(chalk.redBright("\n\nError starting the server..."));
	}

	console.log(chalk.green("\nServer is up and running on Port " + PORT));
});
