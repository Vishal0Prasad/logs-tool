import { Loader } from "./Loader";

export const LogsArea = ({
	loading,
	data,
}: {
	loading: boolean;
	data: any;
}) => {
	return (
		<div className="bg-gray-900 text-gray-100 rounded-xl p-4 shadow-lg h-full overflow-y-auto space-y-3">
			{loading ? (
				<Loader />
			) : data.length > 0 ? (
				data.map((log: any, index: number) => {
					return (
						<div
							key={index}
							className="bg-gray-800 border-l-4 border-blue-500 p-3 rounded-md text-sm font-mono break-words"
						>
							<span
								className={`inline-block mb-1 px-2 py-0.5 rounded text-xs font-semibold ${
									log.level === "error"
										? "bg-red-700 text-red-200 border-red-500"
										: log.level === "warn"
										? "bg-yellow-600 text-yellow-100 border-yellow-400"
										: "bg-blue-700 text-blue-200 border-blue-500"
								}`}
							>
								{log.level.toUpperCase()}
							</span>
							<p className="text-blue-300">Timestamp: {log.timestamp}</p>
							<p>Message: {log.message}</p>
							<p>Resource Id: {log.resourceId}</p>
							<p></p>
						</div>
					);
				})
			) : (
				<div>No data</div>
			)}
		</div>
	);
};
