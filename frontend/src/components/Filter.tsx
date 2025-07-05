import Select, { type MultiValue } from "react-select";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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

export const Filter = ({
	filters,
	actions,
}: {
	filters: FilterState;
	actions: any;
}) => {
	const options = [
		{ value: "error", label: "ERROR", color: "#d32f2f" },
		{ value: "warn", label: "WARNING", color: "#f57c00" },
		{ value: "info", label: "INFO", color: "#1976d2" },
	];

	return (
		<div className="flex justify-center items-center space-x-4 p-4 bg-gray-100">
			<img src="/filter.png" alt="My Icon" width={32} height={32} />
			<input
				id="search"
				placeholder="Search"
				onKeyUp={(e: any) => actions.handleSearch("search", e.target.value)}
				className="bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
			/>

			<Select
				options={options}
				isMulti
				value={filters.levels}
				onChange={(selected: MultiValue<OptionType>) => {
					console.log(selected);
					// setSelectedOptions(selected);
					actions.handleSelect("levels", selected);
				}}
				styles={{
					multiValue: (styles, { data }) => ({
						...styles,
						backgroundColor: data.color,
						color: "white",
					}),
					multiValueLabel: (styles) => ({
						...styles,
						color: "white",
					}),
				}}
			/>

			<input
				id="resourceId"
				className="bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
				placeholder="Resource Id"
				onKeyUp={(e: any) => actions.handleSearch("resourceId", e.target.value)}
			></input>
			<div>
				<label htmlFor="start-date">From: </label>
				<DatePicker
					id="start-date"
					className="bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
					value={filters.dates.start}
					selected={filters.dates.start ? new Date(filters.dates.start) : null}
					maxDate={filters.dates.end ? new Date(filters.dates.end) : new Date()}
					showMonthDropdown
					showYearDropdown
					showIcon
					onChange={(date: Date | null) =>
						actions.handleDate("start", date?.toISOString().split("T")[0])
					}
				/>
			</div>
			<div>
				<label htmlFor="end-date">To: </label>
				<DatePicker
					id="end-date"
					className="bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
					value={filters.dates.end}
					selected={filters.dates.end ? new Date(filters.dates.end) : null}
					minDate={new Date(filters.dates.start)}
					maxDate={new Date()}
					showMonthDropdown
					showYearDropdown
					showIcon
					onChange={(date: Date | null) =>
						actions.handleDate("end", date?.toISOString().split("T")[0])
					}
				/>
			</div>
			{/* <div>
				<label htmlFor="start-date">From: </label>
				<input
					id="start-date"
					type="date"
					defaultValue={""}
					value={filters.dates.start}
					max={filters.dates.end || new Date().toISOString().split("T")[0]}
					className="bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
					onChange={(e: any) => actions.handleDate("start", e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="end-date">To: </label>
				<input
					id="end-date"
					type="date"
					defaultValue={""}
					value={filters.dates.end}
					min={filters.dates.start}
					max={new Date().toISOString().split("T")[0]}
					className="bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
					onChange={(e: any) => actions.handleDate("end", e.target.value)}
				/>
			</div> */}
		</div>
	);
};
