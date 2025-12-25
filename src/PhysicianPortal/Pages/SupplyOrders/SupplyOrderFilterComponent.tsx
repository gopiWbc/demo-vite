import { useState } from "react";
import { DatePicker, Input } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { ChevronDown, ChevronUp, Filter, Search as SearchIcon } from "lucide-react";

import type { SupplyOrderFilters } from "./types";

const { RangePicker } = DatePicker;
const dateFormat = "MM/DD/YYYY";

const SupplyOrderFilterComponent = ({
  filters,
  onFilterChange,
  onSearch,
  onClearAll,
}: {
  filters: SupplyOrderFilters;
  onFilterChange: (filters: SupplyOrderFilters) => void;
  onSearch: () => void;
  onClearAll: () => void;
}) => {
  const [expanded, setExpanded] = useState(true);

  const handleChange = <Key extends keyof SupplyOrderFilters>(key: Key, value: SupplyOrderFilters[Key]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toRangeValue = (range: [string | null, string | null]): [Dayjs | null, Dayjs | null] => [
    range[0] ? dayjs(range[0], dateFormat) : null,
    range[1] ? dayjs(range[1], dateFormat) : null,
  ];

  return (
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
        {(filters.clientId || filters.orderDateRange.some(Boolean)) && (
          <span
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer transition"
            onClick={onClearAll}
          >
            Clear all
          </span>
        )}
      </div>

      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 sm:px-6 py-5 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Client ID</label>
              <Input
                size="large"
                placeholder="Search by client ID"
                prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                value={filters.clientId}
                onChange={(event) => handleChange("clientId", event.target.value)}
                allowClear
                className="shadow-sm"
                onPressEnter={onSearch}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Order date</label>
              <RangePicker
                size="large"
                value={toRangeValue(filters.orderDateRange)}
                onChange={(_, dateStrings) => handleChange("orderDateRange", [dateStrings[0] || null, dateStrings[1] || null])}
                format={dateFormat}
                className="shadow-sm"
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
  );
};

export default SupplyOrderFilterComponent;
