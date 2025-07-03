import React, { useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import "./Filter.css";

export const Filter = () => {
	const [search, setSearch] = useState("");
	const [levels, setLevels] = useState([]);
	const [resourceId, setResourceId] = useState("");
	const [sdate, setSdate] = useState("");
	const [edate, setEdate] = useState("");

	const [logs, setLogs] = useState([]);

	const processSearch = debounce((e: any) => {
		console.log(e.target.id, "---", e.target.value);
		switch (e.target.id) {
			case "search":
				setSearch(e.target.value);
				break;
			case "resourceId":
				setResourceId(e.target.value);
				break;
			default:
				break;
		}
		// setSearch()
	}, 1000);

	const fetchLogs = () => {
		axios
			.get("http://localhost:3000/logs")
			.then((res) => {
				setLogs(res.data);
			})
			.catch(() => {
				console.error("Error fetching logs");
			});
	};

	return (
		<div>
			<input
				id="search"
				className="search"
				placeholder="Search"
				onKeyUp={processSearch}
			/>
			<button>Search</button>
			<select id="levels">
				<option value="error">Error</option>
				<option value="warning">Warning</option>
				<option value="info">Info</option>
			</select>
			<input
				id="resourceId"
				className="resourceId"
				placeholder="Resource Id"
				onKeyUp={processSearch}
			></input>
			<div>
				<label htmlFor="start-date">From: </label>
				<input type="date" id="start-date" />
				<label htmlFor="end-date">To: </label>
				<input type="date" id="end-date" />
			</div>
			<button onClick={fetchLogs}>Apply</button>
			<div>
				{logs.length > 0 ? (
					logs.map((log) => {
						return <div>{log.message}</div>;
					})
				) : (
					<div>No Logs</div>
				)}
			</div>
		</div>
	);
};
