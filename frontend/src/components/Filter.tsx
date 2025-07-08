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
		<div className="flex flex-col sm:flex-row justify-center items-center gap-4 p-4 bg-gray-100">
			<img src="/filter.png" alt="My Icon" width={32} height={32} />
			<input
				id="search"
				placeholder="Search"
				value={filters.search}
				onChange={(e: any) => actions.handleSearch("search", e.target.value)}
				className="w-[200px] bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
			/>

			<Select
				options={options}
				isMulti
				value={filters.levels}
				onChange={(selected: MultiValue<OptionType>) => {
					actions.handleSelect("levels", selected);
				}}
				placeholder={"Log Level"}
				styles={{
					container: (base) => ({
						...base,
						width: "200px", // or '100%' for full width
					}),
					multiValue: (styles, { data }) => ({
						...styles,
						backgroundColor: data.color,
						color: "white",
					}),
					multiValueLabel: (styles) => ({
						...styles,
						color: "white",
					}),
					placeholder: (styles) => ({
						...styles,
						fontSize: "0.875rem",
						lineHeight: "1.25rem",
					}),
				}}
			/>

			<input
				id="resourceId"
				className="w-[200px] bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
				placeholder="Resource Id"
				value={filters.resourceId}
				onChange={(e: any) =>
					actions.handleSearch("resourceId", e.target.value)
				}
			></input>
			<div>
				<DatePicker
					id="start-date"
					className="w-[200px] bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
					value={
						filters.dates.start
							? new Date(filters.dates.start)
									.toLocaleDateString()
									.split("/")
									.join("-")
							: ""
					}
					selected={filters.dates.start ? new Date(filters.dates.start) : null}
					maxDate={filters.dates.end ? new Date(filters.dates.end) : new Date()}
					showMonthDropdown
					showYearDropdown
					showIcon
					placeholderText="From"
					isClearable={true}
					onChange={(date: Date | null) => {
						console.log(date);
						if (date === null) {
							console.log(date);
							actions.handleDate("start", "");
						}
						console.log(date?.toISOString());
						actions.handleDate("start", date?.toISOString());
					}}
				/>
			</div>
			<div>
				<DatePicker
					id="end-date"
					className="w-[200px] bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
					value={
						filters.dates.end
							? new Date(filters.dates.end)
									.toLocaleDateString()
									.split("/")
									.join("-")
							: ""
					}
					selected={filters.dates.end ? new Date(filters.dates.end) : null}
					minDate={new Date(filters.dates.start)}
					maxDate={new Date()}
					showMonthDropdown
					showYearDropdown
					showIcon
					placeholderText="To"
					isClearable={true}
					onChange={(date: Date | null) => {
						if (date === null) {
							console.log(date);
							actions.handleDate("end", "");
						}
						actions.handleDate("end", date?.toISOString());
					}}
				/>
			</div>
			<button
				className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 text-sm hover:bg-gray-300 transition-colors duration-200"
				onClick={actions.handleReset}
			>
				Reset All
			</button>
		</div>
	);
};
