import { useEffect, useState } from "react";
import { debounce } from "lodash";
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

export const MainContainer = () => {
	const [filters, setFilters] = useState<FilterState>({
		search: "",
		levels: [],
		resourceId: "",
		dates: {
			start: "",
			end: "",
		},
	});
	const [loading, setLoading] = useState(true);
	const [logs, setLogs] = useState([]);

	const actions = {
		handleSearch: debounce((key: string, value: string) => {
			setFilters((prev: FilterState) => ({ ...prev, [key]: value }));
		}, 1000),
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
	};

	const formQuery = () => {
		return [
			`search=${filters.search}`,
			`levels=${filters.levels
				.map((level: OptionType) => level.value)
				.join(",")}`,
			`resourceId=${filters.resourceId}`,
			`startDate=${filters.dates.start}`,
			`endDate=${filters.dates.end}`,
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

	useEffect(() => {
		fetchLogs();
	}, [filters]);

	return (
		<div>
			<Filter filters={filters} actions={actions} />
			<LogsArea loading={loading} data={logs} />
		</div>
	);
};
