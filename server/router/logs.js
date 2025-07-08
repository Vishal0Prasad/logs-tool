const express = require("express");
const path = require("path");
const fs = require("fs");

const { validateLogEntry } = require("../middleware/validateLogEntry");

const router = express.Router();
const storagePath = path.join(__dirname, "../data/log_entries.json");

router.get("/logs", (req, res, next) => {
	try {
		const queryParams = req.query;
		fs.readFile(storagePath, "utf-8", (_err, data) => {
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
				})
				.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
			return res.status(200).json(filteredLogs);
		});
	} catch (err) {
		next(err);
	}
});

router.post("/logs", validateLogEntry, async (req, res, next) => {
	try {
		const newLog = req.body;

		//Read from the json file
		const stringData = fs.readFileSync(storagePath, "utf-8");
		const logs = JSON.parse(stringData);

		logs.push(newLog);

		//Write into the json file
		fs.writeFileSync(storagePath, JSON.stringify(logs, null, 4));
		res.status(201).json({ message: "Created." });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
