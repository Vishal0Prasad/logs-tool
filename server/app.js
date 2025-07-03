import express from "express";
import cors from "cors";
import fs from "fs";
import { default as chalk } from "chalk";

const app = express();
const PORT = 3000;

app.use(
	cors({
		origin: "http://localhost:5173",
	})
);

app.get("/logs", (_req, res) => {
	res.status(200);
	fs.readFile("data/log_entries.json", "utf-8", (_err, data) => {
		const logs = JSON.parse(data);
		return res.status(200).json(logs);
	});
});

app.post("/logs", (req, res) => {
	res.status(201);
});

app.listen(PORT, (error) => {
	if (error) {
		console.log(chalk.redBright("\n\nError starting the server..."));
	}
	console.log(chalk.green("\nServer is up and running on Port " + PORT));
});
