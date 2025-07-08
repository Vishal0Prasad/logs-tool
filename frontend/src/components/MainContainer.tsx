import { useEffect, useState, useRef } from "react";
import { debounce, cloneDeep } from "lodash";
import axios from "axios";

import { Filter } from "./Filter";
import { LogsArea } from "./LogsArea";
import type { MultiValue } from "react-select";

type OptionType = {
	value: string;
	label: string;
	color: string;
};

type FilterState = {
	search: string;
	levels: Array<OptionType>;
	resourceId: string;
	dates: {
		start: string;
		end: string;
	};
};

const initState: FilterState = {
	search: "",
	levels: [],
	resourceId: "",
	dates: {
		start: "",
		end: "",
	},
};

export const MainContainer = () => {
	const [filters, setFilters] = useState<FilterState>(cloneDeep(initState));
	const [loading, setLoading] = useState(true);
	const [logs, setLogs] = useState([]);

	const resetRef = useRef(false);

	const actions = {
		handleSearch: (key: string, value: string) => {
			setFilters((prev: FilterState) => ({ ...prev, [key]: value }));
		},
		handleSelect: (key: string, value: MultiValue<OptionType>) => {
			console.log(value, key);
			setFilters((prev: FilterState) => ({ ...prev, [key]: value }));
		},
		handleDate: (key: string, value: string) => {
			setFilters((prev: FilterState) => ({
				...prev,
				dates: {
					...prev.dates,
					[key]: value,
				},
			}));
		},
		handleReset: () => {
			resetRef.current = true;
			setFilters(cloneDeep(initState));
		},
	};

	const formQuery = () => {
		return [
			`search=${filters.search}`,
			`levels=${filters.levels
				.map((level: OptionType) => level.value)
				.join(",")}`,
			`resourceId=${filters.resourceId}`,
			`startDate=${filters?.dates?.start || ""}`,
			`endDate=${filters?.dates?.end || ""}`,
		].join("&");
	};

	const fetchLogs = () => {
		const query = formQuery();
		setLoading(true);
		axios
			.get(`http://localhost:3000/logs?${query}`)
			.then((res) => {
				setLogs(res.data);
			})
			.catch(() => {
				console.error("Error fetching logs");
				setLogs([]);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const debouncedFetch = debounce(fetchLogs, 1000);

	// This useEffect is to handle delayed search input text change using debounce
	// This is to avoid 2 api calls when reset button is clicked
	useEffect(() => {
		// When reset button clicked, skip this debounced api call
		if (resetRef.current) return;
		debouncedFetch();
		return () => debouncedFetch.cancel(); // clean up
	}, [filters.search, filters.resourceId]);

	useEffect(() => {
		fetchLogs();
		// Use this useEffect when reset all is clicked
		// Changge the value to false after the api call is triggered
		if (resetRef.current) {
			resetRef.current = false;
		}
	}, [filters.levels, filters.dates.start, filters.dates.end]);

	return (
		<div>
			<Filter filters={filters} actions={actions} />
			<LogsArea loading={loading} data={logs} />
		</div>
	);
};
