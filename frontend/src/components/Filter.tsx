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

	const handleSearch = debounce((e: any) => {
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

	const handleSelect = (e: any) => {
		const newValue = [e.target.value];
		setLevels(newValue as never[]);
	};

	const handleDate = (e: any) => {
		console.log(e.target.id, e.target.value);
		switch (e.target.id) {
			case "start-date":
				setSdate(e.target.value);
				break;
			case "end-date":
				setEdate(e.target.value);
				break;
			default:
				break;
		}
	};

	const formQuery = () => {
		console.log(levels);
		return [
			`search=${search}`,
			`levels=${levels.join(",")}`,
			`resourceId=${resourceId}`,
			`startDate=${sdate}`,
			`endDate=${edate}`,
		].join("&");
	};

	const fetchLogs = () => {
		const query = formQuery();
		axios
			.get(`http://localhost:3000/logs?${query}`)
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
				onKeyUp={handleSearch}
			/>
			<select id="levels" onChange={handleSelect}>
				<option key="error" value="error">
					Error
				</option>
				<option key="warning" value="warning">
					Warning
				</option>
				<option key="info" value="info">
					Info
				</option>
			</select>
			<input
				id="resourceId"
				className="resourceId"
				placeholder="Resource Id"
				onKeyUp={handleSearch}
			></input>
			<div>
				<label htmlFor="start-date">From: </label>
				<input type="date" id="start-date" onChange={handleDate} />
				<label htmlFor="end-date">To: </label>
				<input type="date" id="end-date" onChange={handleDate} />
			</div>
			<button onClick={fetchLogs}>Apply</button>
			<div>
				{logs.length > 0 ? (
					logs.map((log, index) => {
						return <div key={index}>{log.message}</div>;
					})
				) : (
					<div>No Logs</div>
				)}
			</div>
		</div>
	);
};
