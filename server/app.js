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

app.get("/logs", (req, res) => {
	res.status(200);
	const queryParams = req.query;
	console.log(queryParams);
	fs.readFile("data/log_entries.json", "utf-8", (_err, data) => {
		const logs = JSON.parse(data);
		const filteredLogs = logs
			.filter((log) => {
				if (!queryParams.search) return true;
				return log.message
					.toLowerCase()
					.includes(queryParams.search.toLowerCase());
			})
			.filter((log) => {
				if (!queryParams.levels) return true;
				const levels = queryParams.levels.split(",");
				return levels.includes(log.level);
			})
			.filter((log) => {
				if (!queryParams.resourceId) return true;
				return log.resourceId.includes(queryParams.resourceId);
			})
			.filter((log) => {
				const logDate = new Date(log.timestamp);
				const startDateInput = queryParams.startDate;
				const endDateInput = queryParams.endDate;
				const startDate = startDateInput ? new Date(startDateInput) : null;
				const endDate = endDateInput ? new Date(endDateInput) : null;

				if (endDate) endDate.setHours(23, 59, 59, 999);

				const isAfterStart = !startDate || logDate >= startDate;
				const isBeforeEnd = !endDate || logDate <= endDate;
				return isAfterStart && isBeforeEnd;
			});
		return res.status(200).json(filteredLogs);
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
