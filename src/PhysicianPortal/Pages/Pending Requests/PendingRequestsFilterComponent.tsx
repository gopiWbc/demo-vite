import { useState } from "react";
import { Input, Select } from "antd";
import { Filter, ChevronUp, ChevronDown, Search as SearchIcon } from "lucide-react";

export type PendingRequestFilters = {
  username: string;
  firstName: string;
  lastName: string;
  client: string;
  filterBy: string;
};

type PendingRequestsFilterComponentProps = {
  filters: PendingRequestFilters;
  onFilterChange: (filters: PendingRequestFilters) => void;
  onSearch: () => void;
  onClearAll: () => void;
  expanded?: boolean;
  onToggle?: (expanded: boolean) => void;
};

const filterOptions = [
  { label: "--Select filter--", value: "" },
  { label: "Recently Added", value: "recent" },
  { label: "Oldest", value: "oldest" },
  { label: "Client Pending", value: "client" },
  { label: "Users Pending", value: "user" },
];

const clientOptions = [
  { label: "--Select client--", value: "" },
  { label: "All Clients", value: "all" },
  { label: "Primex Lab", value: "primex" },
  { label: "Wellness Center", value: "wellness" },
];

const PendingRequestsFilterComponent = ({ filters, onFilterChange, onSearch, onClearAll, expanded, onToggle }: PendingRequestsFilterComponentProps) => {
  const [internalExpanded, setInternalExpanded] = useState(true);

  const isControlled = expanded !== undefined;
  const isExpanded = isControlled ? expanded : internalExpanded;

  const setExpanded = (value: boolean) => {
    if (!isControlled) {
      setInternalExpanded(value);
    }
    onToggle?.(value);
  };

  const handleChange = <Key extends keyof PendingRequestFilters>(key: Key, value: PendingRequestFilters[Key]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const removeFilter = (key: keyof PendingRequestFilters) => onFilterChange({ ...filters, [key]: "" });

  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={() => setExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-indigo-800 transition"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {hasFilters && (
            <span className="text-sm font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer transition" onClick={onClearAll}>
              Clear all
            </span>
          )}
        </div>

        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-4 sm:px-6 py-5 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Username</label>
                <Input
                  size="large"
                  placeholder="Enter username"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.username}
                  onChange={(event) => handleChange("username", event.target.value)}
                  allowClear
                  onPressEnter={onSearch}
                  className="shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">First name</label>
                <Input
                  size="large"
                  placeholder="Enter first name"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.firstName}
                  onChange={(event) => handleChange("firstName", event.target.value)}
                  allowClear
                  onPressEnter={onSearch}
                  className="shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Last name</label>
                <Input
                  size="large"
                  placeholder="Enter last name"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.lastName}
                  onChange={(event) => handleChange("lastName", event.target.value)}
                  allowClear
                  onPressEnter={onSearch}
                  className="shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Filter by</label>
                <Select
                  size="large"
                  value={filters.filterBy || undefined}
                  onChange={(value) => handleChange("filterBy", value)}
                  options={filterOptions}
                  className="w-full shadow-sm"
                  placeholder="--Select filter--"
                  allowClear
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Client</label>
                <Select
                  size="large"
                  value={filters.client || undefined}
                  onChange={(value) => handleChange("client", value)}
                  options={clientOptions}
                  className="w-full shadow-sm"
                  placeholder="--Select client--"
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

      <div className="mt-2 flex flex-wrap gap-2">
        {(
          [
            { key: "username", label: "Username", value: filters.username },
            { key: "firstName", label: "First name", value: filters.firstName },
            { key: "lastName", label: "Last name", value: filters.lastName },
            { key: "filterBy", label: "Filter", value: filters.filterBy },
            { key: "client", label: "Client", value: filters.client },
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

export default PendingRequestsFilterComponent;
