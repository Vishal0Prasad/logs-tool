function errorHandler(err, req, res, next) {
	console.error("Unhandled error:", err.stack || err);

	res.status(500).json({
		error: "Internal Server Error",
		message: err.message || "Something went wrong",
	});
}

module.exports = { errorHandler };
