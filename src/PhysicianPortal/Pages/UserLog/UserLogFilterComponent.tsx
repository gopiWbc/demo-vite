import { useState } from "react";
import { DatePicker, Input, Select } from "antd";
import dayjs from "dayjs";
import { Filter, ChevronUp, ChevronDown, Search as SearchIcon } from "lucide-react";

export type UserLogFilterValues = {
  username: string;
  lastName: string;
  firstName: string;
  logType: string;
  userType: string;
  logDate: [string, string];
};

type UserLogFilterProps = {
  filters: UserLogFilterValues;
  onFilterChange: (filters: UserLogFilterValues) => void;
  onSearch: () => void;
  onClearAll: () => void;
  logTypeOptions?: { label: string; value: string }[];
  userTypeOptions?: { label: string; value: string }[];
};

const defaultLogTypeOptions = [
  { label: "--All--", value: "" },
  { label: "Login", value: "login" },
  { label: "Update", value: "update" },
  { label: "Delete", value: "delete" },
];

const defaultUserTypeOptions = [
  { label: "--Select--", value: "" },
  { label: "Physician", value: "physician" },
  { label: "Client", value: "client" },
  { label: "Administrator", value: "admin" },
];

const UserLogFilterComponent = ({
  filters,
  onFilterChange,
  onSearch,
  onClearAll,
  logTypeOptions = defaultLogTypeOptions,
  userTypeOptions = defaultUserTypeOptions,
}: UserLogFilterProps) => {
  const [expanded, setExpanded] = useState(true);

  const handleChange = <Key extends keyof UserLogFilterValues>(key: Key, value: UserLogFilterValues[Key]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleRangeChange = (_: unknown, dateStrings: [string, string]) => {
    onFilterChange({ ...filters, logDate: dateStrings });
  };

  const removeFilter = (key: keyof UserLogFilterValues) => {
    if (key === "logDate") {
      onFilterChange({ ...filters, logDate: ["", ""] });
    } else {
      onFilterChange({ ...filters, [key]: "" });
    }
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === "logDate" && Array.isArray(value)) {
      return value[0] || value[1];
    }
    return Boolean(value);
  });

  const formattedRange = filters.logDate.filter(Boolean).join(" to ");

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-indigo-800 transition"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {hasActiveFilters && (
            <span className="text-sm font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer transition" onClick={onClearAll}>
              Clear all
            </span>
          )}
        </div>

        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-4 sm:px-6 py-5 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Username</label>
                <Input
                  size="large"
                  placeholder="Search by username"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.username}
                  allowClear
                  onChange={(event) => handleChange("username", event.target.value)}
                  onPressEnter={onSearch}
                  className="shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Last name</label>
                <Input
                  size="large"
                  placeholder="Search by last name"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.lastName}
                  allowClear
                  onChange={(event) => handleChange("lastName", event.target.value)}
                  onPressEnter={onSearch}
                  className="shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">First name</label>
                <Input
                  size="large"
                  placeholder="Search by first name"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.firstName}
                  allowClear
                  onChange={(event) => handleChange("firstName", event.target.value)}
                  onPressEnter={onSearch}
                  className="shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Log type</label>
                <Select
                  size="large"
                  value={filters.logType || undefined}
                  onChange={(value) => handleChange("logType", value)}
                  placeholder="--All--"
                  options={logTypeOptions}
                  className="w-full shadow-sm"
                  allowClear
                />
              </div>
           
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">User type</label>
                <Select
                  size="large"
                  value={filters.userType || undefined}
                  onChange={(value) => handleChange("userType", value)}
                  placeholder="--Select--"
                  options={userTypeOptions}
                  className="w-full shadow-sm"
                  allowClear
                />
              </div>
              <div className="">
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Log date</label>
                <DatePicker.RangePicker
                  size="large"
                  format="MM/DD/YYYY"
                  value={filters.logDate[0] && filters.logDate[1] ? [dayjs(filters.logDate[0], "MM/DD/YYYY"), dayjs(filters.logDate[1], "MM/DD/YYYY")] : undefined}
                  onChange={handleRangeChange}
                  className="w-full shadow-sm"
                  allowClear
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-5 border-t border-gray-200">
              <button
                onClick={onClearAll}
                className="rounded-lg border border-gray-300 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600"
              >
                Reset
              </button>
              <button
                onClick={onSearch}
                className="btn-primary rounded-lg px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold shadow-md bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="my-6 flex flex-wrap gap-2">
        {(
          [
            { key: "username", label: "Username", value: filters.username },
            { key: "lastName", label: "Last name", value: filters.lastName },
            { key: "firstName", label: "First name", value: filters.firstName },
            { key: "logType", label: "Log type", value: filters.logType },
            { key: "userType", label: "User type", value: filters.userType },
            { key: "logDate", label: "Log date", value: formattedRange },
          ] as const
        )
          .filter((filter) => filter.value)
          .map((filter) => (
            <span key={filter.key} className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              {filter.label}: {filter.value}
              <button className="ml-1 text-indigo-500 hover:text-indigo-700" onClick={() => removeFilter(filter.key)}>
                ×
              </button>
            </span>
          ))}
      </div>
    </>
  );
};

export default UserLogFilterComponent;
