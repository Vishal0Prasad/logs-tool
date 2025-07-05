const allowedLevels = ["error", "warn", "info", "debug"];

function validateLogEntry(req, res, next) {
	const {
		level,
		message,
		resourceId,
		timestamp,
		traceId,
		spanId,
		commit,
		metadata,
	} = req.body;

	if (!allowedLevels.includes(level)) {
		return res.status(400).json({ error: "Invalid log level" });
	}
	if (typeof message !== "string") {
		return res.status(400).json({ error: "Invalid message" });
	}
	if (typeof resourceId !== "string") {
		return res.status(400).json({ error: "Invalid resourceId" });
	}
	if (isNaN(Date.parse(timestamp))) {
		return res.status(400).json({ error: "Invalid timestamp" });
	}
	if (typeof traceId !== "string") {
		return res.status(400).json({ error: "Invalid traceId" });
	}
	if (typeof spanId !== "string") {
		return res.status(400).json({ error: "Invalid spanId" });
	}
	if (typeof commit !== "string") {
		return res.status(400).json({ error: "Invalid commit" });
	}
	if (
		typeof metadata !== "object" ||
		Array.isArray(metadata) ||
		metadata === null
	) {
		return res.status(400).json({ error: "Invalid metadata" });
	}

	next(); // Proceed to route handler
}

module.exports = { validateLogEntry };
