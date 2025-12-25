import { useState } from "react";
import { DatePicker, Input, Select } from "antd";
import dayjs from "dayjs";
import { ChevronDown, ChevronUp, Filter, Search as SearchIcon } from "lucide-react";

import SalesLogActiveFilters from "./SalesLogActiveFilters";
import type { SalesLogFilterValues } from "./types";

type SalesLogFilterProps = {
  filters: SalesLogFilterValues;
  onFilterChange: (filters: SalesLogFilterValues) => void;
  onSearch: () => void;
  onClearAll: () => void;
};

const dateFormat = "MM/DD/YYYY";

const visitStatusOptions = [
  { label: "--Select visit status--", value: "" },
  { label: "Callback", value: "Callback" },
  { label: "Closed", value: "Closed" },
  { label: "Pending", value: "Pending" },
  { label: "Follow-up", value: "Follow-up" },
];

const salesTeamOptions = [
  { label: "--Select--", value: "" },
  { label: "Self", value: "Self" },
  { label: "Sales Team A", value: "Sales Team A" },
  { label: "Sales Team B", value: "Sales Team B" },
];

const SalesLogFilterComponent = ({ filters, onFilterChange, onSearch, onClearAll }: SalesLogFilterProps) => {
  const [expanded, setExpanded] = useState(true);

  const handleChange = <Key extends keyof SalesLogFilterValues>(key: Key, value: SalesLogFilterValues[Key]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleDateChange = (key: keyof SalesLogFilterValues, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const removeFilter = (key: keyof SalesLogFilterValues) => {
    onFilterChange({ ...filters, [key]: "" });
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

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
            <span
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer transition"
              onClick={onClearAll}
            >
              Clear all
            </span>
          )}
        </div>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            expanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 sm:px-6 py-5 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Log date</label>
                <DatePicker
                  size="large"
                  value={filters.logDate ? dayjs(filters.logDate, dateFormat) : undefined}
                  onChange={(_, dateString) => handleDateChange("logDate", dateString || "")}
                  format={dateFormat}
                  allowClear
                  className="w-full shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Callback date</label>
                <DatePicker
                  size="large"
                  value={filters.callbackDate ? dayjs(filters.callbackDate, dateFormat) : undefined}
                  onChange={(_, dateString) => handleDateChange("callbackDate", dateString || "")}
                  format={dateFormat}
                  allowClear
                  className="w-full shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Client name</label>
                <Input
                  size="large"
                  placeholder="Search by client"
                  prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                  value={filters.clientName}
                  onChange={(event) => handleChange("clientName", event.target.value)}
                  onPressEnter={onSearch}
                  allowClear
                  className="shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Visit status</label>
                <Select
                  size="large"
                  value={filters.visitStatus || undefined}
                  onChange={(value) => handleChange("visitStatus", value)}
                  options={visitStatusOptions}
                  allowClear
                  className="w-full shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Sales Team</label>
                <Select
                  size="large"
                  value={filters.salesTeam || undefined}
                  onChange={(value) => handleChange("salesTeam", value)}
                  options={salesTeamOptions}
                  allowClear
                  className="w-full shadow-sm"
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

      <SalesLogActiveFilters filters={filters} onRemoveFilter={removeFilter} />
    </>
  );
};

export default SalesLogFilterComponent;
